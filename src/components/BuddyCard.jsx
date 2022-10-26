import { Button } from "@mantine/core";
import { getCourseNameFromId, prettifyId } from "../utils/helper";
import { buttonOutlineClasses } from "../utils/constants";
import { Avatar } from "./UI";
import { IconCurrencyRupee } from "@tabler/icons";
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
    <div className="bg-gray-900 p-4 hover: flex flex-col gap-1 justify-between space-y-1 rounded-lg">
      {/* <Avatar userName={name} /> */}
      <p className="font-bold text-xl">{prettifyId(course_id)}</p>
      <p className="text-gray-300">{getCourseNameFromId(course_id)}</p>
      <p className="text-gray-400 truncate">{message}</p>

      <div className="flex gap-2 text-lg">
        {buddyType === "tutor" && (
          <div className="flex">
            <IconCurrencyRupee />
            {money}
          </div>
        )}
        <p className="bg-pink-600 text-gray-300 text-base inline-flex px-2 py-[0.5px] rounded-2xl">
          {buddyType}
        </p>
      </div>
      {/* <div className="relative bottom-0">
      <Button className={buttonOutlineClasses + " block text-white"}>
        Apply
      </Button> 
      </div>
      */}
    </div>
  );
};
export default BuddyCard;
