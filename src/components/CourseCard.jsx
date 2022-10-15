import { Card } from "@mantine/core";
import Link from "next/link";

const CourseCard = ({ name, id }) => {
  return (
    <Link href={`/course/${id}`} passHref>
      <div className="border-neutral-600 rounded-md px-4 truncate hover:cursor-pointer border-[0.3px]">
        <p>{name}</p>
        <p>{id}</p>
      </div>
    </Link>
  );
};
export default CourseCard;
