import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import RichTextEditor from "../../components/RichTextEditor";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";

const NewDoubt = () => {
  const registerHandler = async () => {
    const validationResult = form.validate();

    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    // setLoading(true)
    // const res = await fetch(`/api/course/${form.values.course_id}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(form.values),
    // });

    // const data = await res.json();
    // todo check if error, show notification based on it
    // setLoading(false);
    // setIsModalOpen(false);
  };

  const form = useForm({
    initialValues: {
      course_name: "",
      course_id: "",
      question: "",
    },
    validate: {
      question: (value) => (value.length > 10 ? null : "Too short"),
      course_name: (value) => (value.length > 5 ? null : "Too short"),
      course_id: (value) => (value.length === 6 ? null : "Invalid Course ID"),
    },
  });
  console.log(form.values.question);
  return (
    <div>
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
        label="Course Name"
        placeholder="Course Name"
        {...form.getInputProps("course_id")}
      />

      <div className="p-2" />
      <RichTextEditor className="" {...form.getInputProps("question")} />
      <Button
        onClick={registerHandler}
        className={buttonOutlineClasses + " mt-4"}
      >
        Post your question
      </Button>
    </div>
  );
};
export default NewDoubt;
