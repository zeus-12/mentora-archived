import { getCourseNameFromId, prettifyId } from "../utils/helper";
import { Avatar } from "./UI";
import { IconCurrencyRupee } from "@tabler/icons";
const BuddyCard = ({ buddy, onClick }) => {
  const { course_id, user, message, buddyType, money } = buddy;
  return (
    <div
      onClick={onClick}
      className="bg-gray-900 p-4 hover:scale-[102%] transition transform duration-100 ease-out hover:cursor-pointer flex flex-col gap-1 justify-between space-y-1 rounded-lg"
    >
      {/* <Avatar userName={name} /> */}
      <div className="flex justify-between">
        <p className="font-bold text-xl">{prettifyId(course_id)}</p>
        <p className="bg-green-600 text-gray-300 text-base inline-flex px-2 py-[0.5px] rounded-2xl git capitalize">
          {buddyType}
        </p>
      </div>
      <p className="text-gray-400">{getCourseNameFromId(course_id)}</p>

      <div className="flex gap-2 text-lg">
        {buddyType === "tutor" && (
          <div className="flex">
            <IconCurrencyRupee />
            {money}
          </div>
        )}
      </div>
    </div>
  );
};
export default BuddyCard;
