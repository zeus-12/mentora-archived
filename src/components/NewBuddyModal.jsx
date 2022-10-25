import { Button, Modal, Radio, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconX } from "@tabler/icons";
import { useState } from "react";

const NewBuddyModal = ({ newBuddyModal, closeNewBuddyModal }) => {
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      course_id: "",
      message: "",
      buddyType: "",
      money: "",
    },
    validate: {
      message: (value) => (value.length > 10 ? null : "Too short"),
      buddyType: (value) =>
        ["batchmate", "tutor"].includes(value) ? null : "Choose a Buddy Type",
      course_id: (value) => (value.length === 6 ? null : "Invalid Course ID"),
      money: (value) =>
        /^\d+$/.test(value) || value === "" ? null : "Invalid Money",
      // todo money should be integer
    },
  });

  const registerHandler = async () => {
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/buddy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    });

    const data = await res.json();

    if (data.error) {
      // todo check if error, show notification based on it
      setLoading(false);
      return;
    }
    // show notification
    setLoading(false);
    form.reset();

    closeNewBuddyModal();
  };

  return (
    <Modal
      withCloseButton={false}
      transition="fade"
      transitionDuration={600}
      transitionTimingFunction="ease"
      opened={newBuddyModal}
      onClose={closeNewBuddyModal}
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
            onClick={closeNewBuddyModal}
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
        {/* <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course Name"
          placeholder="Course Name"
          {...form.getInputProps("course_name")}
        /> */}
        <TextInput
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Course ID"
          placeholder="Course ID"
          {...form.getInputProps("course_id")}
        />
        {form.values.buddyType === "tutor" && (
          <TextInput
            required={true}
            className="w-[90vw] max-w-[30rem]"
            label="Offer Money"
            placeholder="Offer Money"
            {...form.getInputProps("money")}
          />
        )}
        <Textarea
          required={true}
          className="w-[90vw] max-w-[30rem]"
          label="Message for your buddy"
          placeholder="Explain why you would be a perfect buddy!"
          {...form.getInputProps("message")}
        />
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
  );
};
export default NewBuddyModal;
