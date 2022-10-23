import { Avatar } from "@mantine/core";
import { generateAvatarText } from "../utils/helper";

const SubCommentCard = ({ comment }) => {
  return (
    <div className="pl-8 flex items-center">
      <Avatar size={40} color="blue">
        {generateAvatarText(comment.user)}
      </Avatar>
      <p>{comment.comment}</p>
      {/* <p>{comment.user}</p> */}
    </div>
  );
};
export default SubCommentCard;
