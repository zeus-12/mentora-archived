import { Button, Input, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import Fuse from "fuse.js";
import NewCourseModal from "../../components/NewCourseModal";
import LoaderComponent from "../../components/LoaderComponent";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";
import { getCourseNameFromId } from "../../utils/helper";

export default function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourseNames = async () => {
      const res = await fetch("/api/course");
      const courseNames = await res.json();
      console.log(courseNames.data);
      const courseNameData = courseNames.data.map((item) => {
        return {
          _id: item._id,
          course_id: item.course_id,
          course_name: getCourseNameFromId(item.course_id),
        };
      });

      setCourses(courseNameData);
      console.log(courseNameData);
    };
    fetchCourseNames();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // todo fix fuse search
  const fuse = new Fuse(courses, { keys: ["course_id", "course_name"] });
  const [searchQuery, setSearchQuery] = useState("");

  const filterData = (data) => {
    if (searchQuery.trim() === "") {
      return courses.map((doc, idx) => ({
        item: doc,
        score: 1,
        refIndex: idx,
      }));
    } else if (data.length > 0) {
      return fuse.search(searchQuery);
    }
  };

  return (
    <div className="flex min-h-[90vh] flex-col">
      <div className="flex gap-4 items-center justify-center">
        <div className="max-w-[40rem] flex-1 ">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>
        <Button
          variant="outline"
          className={buttonOutlineClasses}
          onClick={() => setIsModalOpen(true)}
        >
          Add course
        </Button>
      </div>
      {courses.length === 0 && <LoaderComponent />}

      <div className="flex justify-center">
        {courses.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {courses.length > 0 &&
              filterData(courses).map((course) => (
                <CourseCard
                  key={course.item.course_id}
                  name={course.item.course_name}
                  id={course.item.course_id}
                />
              ))}
          </div>
        )}
      </div>

      <NewCourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
