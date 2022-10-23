import { Avatar } from "@mantine/core";
import { generateAvatarText } from "../utils/helper";

const CommentCard = ({ comment }) => {
  console.log(comment);
  console.log(comment);
  return (
    <div>
      <div className="flex items-center">
        <Avatar size={40} color="blue">
          {generateAvatarText(comment.user)}
        </Avatar>
        <p>{comment.comment}</p>
        {/* <p>{comment.user}</p> */}
      </div>
    </div>
  );
};
export default CommentCard;
