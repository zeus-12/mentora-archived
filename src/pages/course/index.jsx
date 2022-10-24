import { Button, Input, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import NewCourseModal from "../../components/NewCourseModal";
import LoaderComponent from "../../components/LoaderComponent";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";
import { getCourseNameFromId } from "../../utils/helper";
import { useSession } from "next-auth/react";
import { notSignedInNotification } from "../../utils/notification";
const name_id_map = require("../../../name-id-map.json");

export default function Home() {
  // const [courses, setCourses] = useState([]);
  const { data: session } = useSession();

  // useEffect(() => {
  //   const fetchCourseNames = async () => {
  //     const res = await fetch("/api/course");
  //     const courseNames = await res.json();
  //     console.log(courseNames.data);
  //     const courseNameData = courseNames.data.map((item) => {
  //       return {
  //         _id: item._id,
  //         course_id: item.course_id,
  //         course_name: getCourseNameFromId(item.course_id),
  //       };
  //     });

  //     setCourses(courseNameData);
  //     console.log(courseNameData);
  //   };
  //   fetchCourseNames();
  // }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const addCourseHandler = () => {
    if (!session) {
      notSignedInNotification("Please sign in to add a course!");
      return;
    }
    setIsModalOpen(true);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const generateCoursesData = (name_id_map) => {
    const coursesData = [];
    Object.keys(name_id_map).map((item) => {
      coursesData.push({
        course_name: name_id_map[item],
        course_id: item,
      });
    });
    return coursesData;
  };

  const courses = generateCoursesData(name_id_map);

  const filterData = (data) => {
    if (searchQuery.trim().length === 0) {
      return [];
    } else {
      data = data.filter(
        (item) =>
          item.course_name
            .replaceAll(" ", "")
            .toLowerCase()
            .includes(searchQuery.replaceAll(" ", "").toLowerCase()) ||
          item.course_id
            .replaceAll(" ", "")
            .toLowerCase()
            .includes(searchQuery.replaceAll(" ", "").toLowerCase())
      );
      return data;
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
          onClick={() => addCourseHandler()}
        >
          Add course
        </Button>
      </div>
      {courses.length === 0 && <LoaderComponent />}

      <div className="flex justify-center">
        {filterData(courses).length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {filterData(courses)?.map((course) => (
              <CourseCard
                key={course.course_id}
                name={course.course_name}
                id={course.course_id}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 font-medium text-xl mt-16">
            Start typing the Course Id/Name...
          </p>
        )}
      </div>

      <NewCourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
