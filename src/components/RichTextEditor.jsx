import RichText from "./RichText";

const RichTextEditor = ({ value, onChange, className }) => {
  return (
    <div>
      <RichText
        className={`min-h-[50vh] max-h-[85vh] text-xl overflow-scroll ${className}`}
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

export default RichTextEditor;
