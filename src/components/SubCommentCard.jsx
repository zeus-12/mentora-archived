import { Code } from "@mantine/core";

const SubCommentCard = (props) => {
  return (
    <div className="pl-2">
      <Code>{JSON.stringify(props)}</Code>
    </div>
  );
};
export default SubCommentCard;
