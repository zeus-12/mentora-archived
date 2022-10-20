import { Button, Input, Loader } from "@mantine/core";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Fuse from "fuse.js";
import NewCourseModal from "../components/NewCourseModal";
import LoaderComponent from "../components/LoaderComponent";
import { buttonOutlineClasses } from "../utils/tailwindClasses";
export default function Home() {
  const [courses, setCourses] = useState([
    // { course_id: "ab1234", course_name: "test" },
    // { course_id: "ed2324", course_name: "hello" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
    // { course_id: "sj2345", course_name: "intro" },
    // { course_id: "hi1341", course_name: "welcome" },
    // { course_id: "ml1343", course_name: "therefore" },
  ]);

  useEffect(() => {
    const fetchCourseNames = async () => {
      const res = await fetch("/api/course");
      const courseNames = await res.json();
      setCourses(courseNames.data);
    };
    fetchCourseNames();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    <div>
      <div>
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
        {/* course cards */}
        <div className="flex justify-center">
          {courses.length > 0 && (
            // <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2">
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
      </div>

      <NewCourseModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
