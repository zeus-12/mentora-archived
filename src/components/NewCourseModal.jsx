import { TextInput, ActionIcon, Button, Modal, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconTrash } from "@tabler/icons";
import { useState } from "react";

const NewCourseModal = ({ isModalOpen, setIsModalOpen }) => {
  const form = useForm({
    initialValues: {
      course_name: "",
      course_id: "",
      description: "",
      professors: [""],
      credits: "",
    },
    validate: {
      description: (value) => (value.length > 10 ? null : "Too short"),
      course_name: (value) => (value.length > 5 ? null : "Too short"),
      credits: (value) =>
        Number(value) > 0 && Number(value) < 15 ? null : "Invalid credits",
      course_id: (value) => (value.length === 6 ? null : "Invalid Course ID"),
    },
  });

  const [loading, setLoading] = useState(false);

  const registerHandler = async () => {
    const validationResult = form.validate();

    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/course/${form.values.course_id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    // todo check if error, show notification based on it
    setLoading(false);
    setIsModalOpen(false);
  };

  const addNewProfessor = () => {
    form.insertListItem("professors", "");
  };

  return (
    <Modal
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      opened={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      title="Add Course"
      centered={true}
      classNames={{
        title: "text-2xl text-green-200 font-bold",
        modal: "bg-black",
      }}
      size="lg"
      radius="md"
    >
      <div className="flex flex-col mx-2 sm:mx-4 items-center">
        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course Name"
          placeholder="Course Name"
          {...form.getInputProps("course_name")}
        />

        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course ID"
          placeholder="Course ID"
          {...form.getInputProps("course_id")}
        />

        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course Credits"
          placeholder="Course Credits"
          {...form.getInputProps("credits")}
        />

        <Textarea
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course Description"
          placeholder="Course Description"
          {...form.getInputProps("description")}
        />

        <div className="flex flex-1 mt-4 items-center justify-between max-w-[25rem] w-screen">
          <p className="sm:text-2xl text-2xl font-semibold">Professors</p>
          <Button
            variant="outline"
            className={
              form.values.professors.length > 6
                ? "hidden"
                : "" +
                  "hover:text-white text-green-300 border-green-300  hover:bg-green-300"
            }
            onClick={addNewProfessor}
          >
            +
          </Button>
        </div>

        {form.values.professors.map((item, index) => (
          <div
            key={index}
            className="mt-4 flex items-center justify-between gap-4"
          >
            <TextInput
              required={true}
              className="w-[90vw] max-w-[30rem]"
              placeholder="Name"
              withAsterisk
              {...form.getInputProps(`professors.${index}`)}
            />

            <ActionIcon
              color="red"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              variant="outline"
              onClick={() => form.removeListItem("professors", index)}
            >
              <IconTrash size={16} />
            </ActionIcon>
          </div>
        ))}

        <Button
          onClick={registerHandler}
          loading={loading}
          className="hover:text-white flex text-orange-600 border-orange-600 hover:bg-orange-700 mt-3"
          variant="outline"
        >
          Add
        </Button>
      </div>
    </Modal>
  );
};
export default NewCourseModal;
