import { Button } from "@mantine/core";
import { useState } from "react";
import RichText from "../../components/RichText";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";

const RichTextEditor = ({ value, onChange }) => {
  return (
    <div>
      <RichText
        className="min-h-[50vh] max-h-[85vh] text-xl overflow-scroll"
        value={value}
        onChange={onChange}
        sticky={false}
        controls={[
          ["h1", "h2", "h3"],
          ["bold", "link", "image", "blockquote", "codeBlock"],
          ["sup", "sub"],
        ]}
      />
    </div>
  );
};

const NewDoubt = () => {
  const [value, onChange] = useState("");
  console.log(value);
  return (
    <div>
      <RichTextEditor value={value} onChange={onChange} />
      <Button className={buttonOutlineClasses + " mt-4"}>
        Post your question
      </Button>
    </div>
  );
};
export default NewDoubt;
