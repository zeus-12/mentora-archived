import Link from "next/link";
import React from "react";
import { prettifyId } from "../utils/helper";

const CourseCard = ({ name, id }) => {
  return (
    <Link href={`/course/${id}`} passHref>
      <div className="folder m-10 text-black hover:scale-105 transition transform duration-100 ease-out hover:cursor-pointer ">
        <p>{name}</p>
        <p>{prettifyId(id)}</p>
      </div>
    </Link>
  );
};

export default CourseCard;
