import { Button, FileInput, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useState } from "react";
import { buttonOutlineClasses } from "../../utils/constants";

const NewDoubt = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const registerHandler = async () => {
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/doubt`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    // todo check if error, show notification based on it
    setLoading(false);
    router.push("/doubt");
  };

  const form = useForm({
    initialValues: {
      course_id: "",
      doubt: "",
      title: "",
    },
    validate: {
      doubt: (value) => (value.length > 10 ? null : "Too short"),
      // course_name: (value) => (value.length > 5 ? null : "Too short"),
      title: (value) => (value.length > 4 ? null : "Too short"),
      course_id: (value) => (value?.length === 6 ? null : "Invalid Course ID"),
    },
  });
  console.log(form.values.doubt);

  return (
    <div className="flex-1">
      <p className="text-3xl font-bold tracking-tighter mb-4">Ask a Doubt!</p>

      <TextInput
        required={true}
        className="w-[90vw] max-w-[30rem]"
        label="Course ID"
        placeholder="Course ID"
        {...form.getInputProps("course_id")}
      />

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
        label="Doubt Title"
        placeholder="Doubt Title"
        {...form.getInputProps("title")}
      />
      <Textarea
        required={true}
        className="w-[90vw] max-w-[30rem]"
        label="Doubt"
        placeholder="Enter your doubt"
        {...form.getInputProps("doubt")}
      />
      {/* <div className="p-2" />
      <RichTextEditor className="" {...form.getInputProps("question")} /> */}
      <div className="flex justify-start">
        <FileInput placeholder="Pick file" label="Attach Files" withAsterisk />
      </div>
      <Button
        loading={loading}
        onClick={registerHandler}
        className={buttonOutlineClasses + " mt-4"}
      >
        Post your question
      </Button>
    </div>
  );
};
export default NewDoubt;
