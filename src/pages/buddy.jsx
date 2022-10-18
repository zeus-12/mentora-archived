import { Button, Modal, Radio, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
import { IconX } from "@tabler/icons";

const Buddy = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm({
    initialValues: {
      course_name: "",
      course_id: "",
      message: "",
      buddyType: "",
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      course_name: (value) => (value.length > 5 ? null : "Too short"),
      buddyType: (value) =>
        ["batchmate", "tutor"].includes(value) ? null : "Invalid Buddy Type",
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
    // const res = await fetch(`/api/buddy/${form.values.course_id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form.values),
    // });

    // const data = await res.json();
    // todo check if error, show notification based on it
    setLoading(false);
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <div>
          <p className="text-3xl font-semibold">
            Having trouble with your studies? <br />
            <span>Get yourself a Study/Tutor Buddy</span>
          </p>
          <Button
            variant="outline"
            className={`mt-2 ${buttonOutlineClasses}`}
            onClick={() => setIsModalOpen(true)}
          >
            Apply Now!
          </Button>
        </div>
        {/* image to right */}
      </div>
      <p className="mt-16 text-3xl text-center">
        Interested in helping others out?
      </p>
      {/* DISPLAY ALL THE DATA HERE */}

      <Modal
        withCloseButton={false}
        transition="fade"
        transitionDuration={600}
        transitionTimingFunction="ease"
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        centered={true}
        classNames={{
          modal: "bg-black flex flex-col justify-center items-center",
        }}
        size="lg"
        radius="md"
      >
        <div className="flex flex-col ">
          <div className="flex justify-between items-center">
            <p className="text-2xl text-green-200 font-bold">Request a Buddy</p>
            <IconX
              onClick={() => setIsModalOpen(false)}
              className="hover:cursor-pointer"
            />
          </div>
          <Radio.Group
            label="Buddy Type"
            withAsterisk
            {...form.getInputProps("buddyType")}
          >
            <Radio value="tutor" label="Tutor" />
            <Radio value="batchmate" label="Batchmate" />
          </Radio.Group>
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
          <Textarea
            required={true}
            className="w-[90vw] max-w-[30rem]"
            label="Message for your buddy"
            placeholder="Message for your buddy"
            {...form.getInputProps("message")}
          />
          {form.values.buddyType === "tutor" && "enter money"}
          {/* <div className="flex flex-1 mt-4 items-center justify-between max-w-[25rem] w-screen">
            <p className="sm:text-2xl text-2xl font-semibold">Professors</p>
            <Button
              variant="outline"
              className={
                form.values.professors.length > 6
                  ? "hidden"
                  : "" +
                    "hover:text-white text-green-300 border-green-300  hover:bg-green-300"
              }
              onClick={""}
            >
              +
            </Button>
          </div> */}
          {/* 
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
                {/* <IconTrash size={16} /> */}
          {/* </ActionIcon>
            </div>
          ))} */}{" "}
          {/* */}
          <Button
            onClick={registerHandler}
            loading={loading}
            className="hover:text-white text-orange-600 border-orange-600 hover:bg-orange-600 mt-3"
            variant="outline"
          >
            Request
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default Buddy;
