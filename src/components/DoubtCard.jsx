import { getCourseNameFromId, prettifyId } from "../utils/helper";

const DoubtCard = ({ doubt }) => {
  const { course_id, title, doubt: doubtDescription } = doubt;
  return (
    <div className="bg-gray-900 px-8 py-3 space-y-1 rounded-xl">
      <p className="font-bold text-xl">
        {prettifyId(course_id)}:{" "}
        <span className="text-gray-400 font-semibold">
          {getCourseNameFromId(course_id)}
        </span>
      </p>

      <p className="text-gray-400 truncate">{title}</p>
    </div>
  );
};
export default DoubtCard;
