import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoaderComponent from "../../components/LoaderComponent";
const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    setLoading(true);
    const fetchCourseData = async () => {
      const res = await fetch("/api/course/" + courseId);
      const data = await res.json();
      setCourseData(data.data);
      console.log(data.data);
    };
    fetchCourseData();
    setLoading(false);
  }, [courseId]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <div>
      {/* {courseId} */}
      {/* course contents */}

      {/* comments */}
    </div>
  );
};
export default CourseDetails;
