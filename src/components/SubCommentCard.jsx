import { Avatar } from "@mantine/core";
import { generateAvatarText } from "../utils/helper";

const SubCommentCard = ({ comment }) => {
  return (
    <div className="pl-8 flex items-center mt-4 gap-2 ">
      <Avatar size={40} color="blue">
        {generateAvatarText(comment.user)}
      </Avatar>
      <div className="bg-[#3441457c] rounded-full p-2">
        <p>{comment.comment}</p>
      </div>
      {/* <p>{comment.user}</p> */}
    </div>
  );
};
export default SubCommentCard;
