import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderComponent from "../../components/LoaderComponent";
import { prettifyId } from "../../utils/helper";

const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [comments, setComments] = useState([]);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    const fetchCourseData = async () => {
      const res = await fetch("/api/course/" + courseId);
      const data = await res.json();
      setCourseData(data.data);
      console.log(data.data);
    };
    fetchCourseData();
  }, [courseId]);
  console.log(courseData);
  console.log(Object.keys(courseData));

  // if (Object.keys(courseData).length === 0) {
  //   return <LoaderComponent />;
  // }

  return (
    <div>
      <p className="text-3xl">{courseData?.course_name}</p>
      {/* <p className="text-3xl">{prettifyId(courseData?.course_id)}</p> */}
      {/* {professors.length > 0 &<p>Course Name: {course_name}</p>} */}
    </div>
  );
};
export default CourseDetails;
