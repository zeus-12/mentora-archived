import { Input } from "@mantine/core";
import Head from "next/head";
import { useEffect, useState } from "react";
import CourseCard from "../components/CourseCard";
import Fuse from "fuse.js";

export default function Home() {
  const [courses, setCourses] = useState([
    // { course_id: "ab1234", course_name: "test" },
    // { course_id: "ed2324", course_name: "hello" },
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
      <Head>
        <title>Mentora</title>
        <meta name="description" content="Acads app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <div className="max-w-[40rem] mx-auto mb-4 ">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            width={200}
            variant="filled"
            placeholder="Enter course name/id"
            size="md"
          />
        </div>
        {/* course cards */}
        <div className="grid grid-cols-3 gap-3">
          {courses.length > 0 &&
            filterData(courses).map((course) => (
              <CourseCard
                key={course.item.course_id}
                name={course.item.course_name}
                id={course.item.course_id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
