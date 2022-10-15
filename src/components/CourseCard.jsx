import { Card } from "@mantine/core";
import Link from "next/link";

import Folder from "../UI components/Folder";
const CourseCard = ({ name, id }) => {
  return (
    <Link href={`/course/${id}`} passHref>
      {/* // <div className="border-neutral-600 border-[0.3px]"> */}
      {/* //     <div className="border-neutral-600 rounded-md px-4 truncate hover:cursor-pointer border-[0.3px]"> */}

      <Folder>
        <p>{name}</p>
        <p>{id}</p>
      </Folder>
      {/* // </div> */}
    </Link>
  );
};
export default CourseCard;
