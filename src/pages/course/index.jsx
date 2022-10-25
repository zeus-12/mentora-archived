import { Button, Input, Loader, Menu } from "@mantine/core";
import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import LoaderComponent from "../../components/LoaderComponent";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";
import { getCourseNameFromId } from "../../utils/helper";
import { useSession } from "next-auth/react";
import { notSignedInNotification } from "../../utils/notification";
import { IconCheck, IconNotebook } from "@tabler/icons";
import { availableBranches } from "../../utils/courseData";
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
  const [branchFilter, setBranchFilter] = useState("all");
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
  const branchFilteredCourses = () => {
    if (branchFilter === "all") {
      return courses;
    }

    return courses.filter((course) => {
      return course.course_id.startsWith(branchFilter);
    });
  };

  const filterCoursesOnSearch = (data) => {
    if (searchQuery.trim().length === 0) {
      return [];
    } else {
      return data.filter(
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
    }
  };

  const filteredCourses = filterCoursesOnSearch(branchFilteredCourses());

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
        <Menu shadow="md" height={20} width={200}>
          <Menu.Target>
            <Button className="text-gray-400 p-0 hover:text-white bg-inherit hover:bg-inherit">
              <IconNotebook className="w-7 h-7" />
            </Button>
          </Menu.Target>
          <Menu.Dropdown className="overflow-scroll h-60">
            <Menu.Label>Course Branch</Menu.Label>
            {availableBranches.map((item) => (
              <Menu.Item
                onClick={() => setBranchFilter(item)}
                key={item}
                className="capitalize"
              >
                <div className="flex justify-between items-center">
                  {item}
                  {item === branchFilter && <IconCheck className="w-5 h-5" />}
                </div>
              </Menu.Item>
            ))}
          </Menu.Dropdown>
        </Menu>
      </div>
      {courses.length === 0 && <LoaderComponent />}

      <div className="flex justify-center">
        {searchQuery.trim().length !== 0 && filteredCourses?.length === 0 && (
          <p>No course found!</p>
        )}

        {searchQuery.trim().length === 0 && (
          <p className="text-gray-400">Start typing the Course name/id ... </p>
        )}

        {filteredCourses.length > 0 && (
          <div className="grid auto-rows-max justify-items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {filteredCourses?.map((course) => (
              <CourseCard
                key={course.course_id}
                name={course.course_name}
                id={course.course_id}
              />
            ))}
          </div>
        )}
      </div>

      {/* <NewCourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      /> */}
    </div>
  );
}
