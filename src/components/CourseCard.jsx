import Link from "next/link";
import React from "react";
import { prettifyId } from "../utils/helper";
import { IconFolder } from "@tabler/icons";
const CourseCard = ({ name, id }) => {
  return (
    <div className="mt-2">
      <Link href={`/course/${id}`} passHref>
        <div className="mx-10 my-4 border rounded-lg p-3 w-25 text-white hover:scale-105 transition transform duration-100 ease-out hover:cursor-pointer ">
          <div className="flex gap-2">
            <IconFolder />
            <p>{prettifyId(id)}</p>
          </div>
          <p>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
