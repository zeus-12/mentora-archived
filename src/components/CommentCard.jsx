import { Avatar } from "@mantine/core";
import { useState } from "react";
import { generateAvatarText } from "../utils/helper";
import { IconCornerUpLeft, IconHeart } from "@tabler/icons";
const CommentCard = ({ comment }) => {
  const [color, setColor] = useState(false);

  console.log(comment);
  console.log(comment);
  return (
    <div>
      <div className="flex justify-between text-md bg-[#3441457c] rounded-md">
        <div className=" flex items-center gap-4 p-2 ">
          <Avatar size={40} color="blue">
            {generateAvatarText(comment.user)}
          </Avatar>
          <p className="text-white">{comment.comment}</p>
        </div>
        <div className="flex flex-col">
          <button className="flex m-1">
            <h4 className="hover:border-b-[1px] pb-1">reply</h4>
            <IconCornerUpLeft />
          </button>
          <div onClick={() => setColor(!color)}>
            {/* <button onClick={()=>setColor(!color)}> */}
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-heart" width={24} height={24} viewBox="0 0 24 24" strokeWidth="2" stroke={color?"red":"white"} fill={color?"red":"none"} strokeLinecap="round" strokeLinejoin="round">
   <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
   <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428m0 0a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
</svg> */}

            <IconHeart className={color ? "fill-red-400 text-red-400" : ""} />
            {/* </button> */}
          </div>
        </div>
        {/* <p>{comment.user}</p> */}
      </div>
    </div>
  );
};
export default CommentCard;
