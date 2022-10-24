import { Button } from "@mantine/core";
import { getCourseNameFromId, prettifyId } from "../utils/helper";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
import { Avatar } from "./UI";

const BuddyCard = ({ buddy }) => {
  // {
  //   "_id": "6350d1eb159d8d17636207c3",
  //   "course_id": "ed1012",
  //   "course_name": "learn stuff",
  //   "user": "elonmask2806@gmail.com",
  //   "message": "adsfasfsdfasf",
  //   "buddyType": "tutor",
  //   "money": "12",
  //   "date": "2022-10-20T04:43:23.737Z",
  // }

  const { course_id, user, message, buddyType, money } = buddy;
  return (
    <div className="bg-gray-900 p-8 space-y-1 rounded-xl">
      {/* <Avatar userName={name} /> */}
      <p className="font-bold text-xl">{prettifyId(course_id)}</p>
      <p className="text-gray-300">{getCourseNameFromId(course_id)}</p>
      <p className="text-gray-400 truncate">{message}</p>
      <p className="bg-pink-600 text-white inline-flex px-2 py-[0.5px] rounded-2xl">
        {buddyType}
      </p>
      <p>{money > 0 && "Rs." + money}</p>
      <Button className={buttonOutlineClasses + " block text-white"}>
        Apply
      </Button>
    </div>
  );
};
export default BuddyCard;
