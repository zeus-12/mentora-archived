import { Avatar } from "@mantine/core";
import { generateAvatarText } from "../utils/helper";

const SubCommentCard = ({ comment }) => {
  return (
    <div className="ml-12 border-[1px] p-1 border-[#3441457c] flex items-center mt-1 gap-2">
      <Avatar size={40} color="blue">
        {generateAvatarText(comment.user)}
      </Avatar>
      <div className="">
        <p>{comment.comment}</p>
      </div>
    </div>
  );
};
export default SubCommentCard;
