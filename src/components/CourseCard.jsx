import { Card } from "@mantine/core";
import Folder from "../UI components/Folder";
const CourseCard = ({ name, id }) => {
  return (
    // <div className="border-neutral-600 border-[0.3px]">
      <Folder>
        <p>{name}</p>
        <p>{id}</p>
      </Folder>
    // </div>
  );
};
export default CourseCard;
