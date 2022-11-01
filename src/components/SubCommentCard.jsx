import { Avatar } from "@mantine/core";
import { IconHeart } from "@tabler/icons";
import { generateAvatarText } from "../utils/helper";
import {
  errorNotification,
  notSignedInNotification,
} from "../utils/notification";

const SubCommentCard = ({
  like_count,
  user,
  comment,
  session,
  liked,
  mutate,
  type,
  _id,
}) => {
  const likeCommentHandler = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to like");
      return;
    }

    const res = await fetch(`/api/${type}/like/${_id}`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.error) {
      errorNotification(data.error);
      return;
    } else {
      mutate();
    }
  };

  return (
    <div className="ml-12 border-[1px] justify-between p-1 border-[#3441457c] flex items-center mt-1 gap-2">
      <div className="flex gap-4 items-center">
        <Avatar size={40} color="blue">
          {generateAvatarText(user)}
        </Avatar>
        <div className="">
          <p>{comment}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <IconHeart
          onClick={likeCommentHandler}
          className={
            liked
              ? "fill-red-400 text-red-400"
              : "" + " hover:cursor-pointer w-6 h-6"
          }
        />
        <p className="text-gray-400">{like_count}</p>
      </div>
    </div>
  );
};
export default SubCommentCard;
