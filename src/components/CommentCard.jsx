import { Avatar, TextInput } from "@mantine/core";
import { useState } from "react";
import { generateAvatarText } from "../utils/helper";
import { IconCornerUpLeft, IconHeart, IconSend } from "@tabler/icons";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { notSignedInNotification } from "../utils/notification";

const CommentCard = ({ user, comment, type, id, mutate, parentId }) => {
  // const { mutate } = useSWRConfig();

  const [liked, setLiked] = useState(false);
  const [showNewComment, setShowNewComment] = useState(false);
  const form = useForm({
    initialValues: {
      comment: "",
    },
    validate: {
      // comment: (value) => (value.length > 10 ? null : "Too short"),
    },
  });

  const { data: session } = useSession();

  const postSubComment = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to comment");
      return;
    }
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }

    let requestBody = {};
    requestBody[type] = form.values.comment;
    // setLoading(true);
    const res = await fetch(`/api/${type}/${id}/${parentId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();
    if (data.error) {
      // throw error notifcation
    } else {
      mutate();
      // show success notification
      form.reset();
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center text-md border-[1px] px-1 py-2 border-[#3441457c] rounded-md">
        <div className="flex items-center gap-4">
          <Avatar size={40} color="blue">
            {generateAvatarText(user)}
          </Avatar>
          <p>{comment}</p>
        </div>
        <div className="gap-1 flex">
          <IconHeart
            onClick={() => setLiked((prev) => !prev)}
            className={
              liked
                ? "fill-red-400 text-red-400"
                : "" + " hover:cursor-pointer w-6 h-6"
            }
          />
          <IconCornerUpLeft
            className="hover:text-gray-100 hover:cursor-pointer w-6 h-6"
            onClick={() => setShowNewComment((prev) => !prev)}
          />
        </div>
      </div>
      {showNewComment && (
        <div className="flex items-center gap-2 px-2">
          <TextInput
            placeholder="Add a comment..."
            className="my-2 flex-1 ml-12"
            {...form.getInputProps("comment")}
          />
          <IconSend
            onClick={postSubComment}
            className="hover:text-gray-100 hover:cursor-pointer w-6 h-6"
          />
        </div>
      )}
    </div>
  );
};
export default CommentCard;
