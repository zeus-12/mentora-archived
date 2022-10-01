import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [comments, setComments] = useState([]);
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    // fetch course details and comments for the course
  }, []);
  return (
    <div>
      {courseId}
      {/* course contents */}

      {/* comments */}
    </div>
  );
};
export default CourseDetails;
