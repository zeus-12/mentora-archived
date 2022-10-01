import { Card } from "@mantine/core";

const CourseCard = ({ name, id }) => {
  return (
    <div className="border-neutral-600 border-[0.3px]">
      <p>{name}</p>
      <p>{id}</p>
    </div>
  );
};
export default CourseCard;
