import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { prettifyId } from "../../utils/helper";
import { buttonOutlineClasses } from "../../utils/tailwindClasses";

const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const [comments, setComments] = useState([]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      const res = await fetch(`/api/course/${courseId}`);
      const data = await res.json();
      setCourseData(data.data);
      console.log("Fetched");
    };
    fetchCourseData();
  }, [courseId]);

  const form = useForm({
    initialValues: {
      comment: "",
    },
    validate: {
      comment: (value) => (value.length > 10 ? null : "Too short"),
    },
  });

  // console.log(Object.keys(courseData).length);
  // if (Object.keys(courseData).length === 0) {
  //   return <LoaderComponent />;
  // }

  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <p className="text-3xl font-bold">{courseData?.course_name}</p>
          <p className="text-2xl font-semibold">
            {courseData?.course_id && prettifyId(courseData?.course_id)}
          </p>
        </div>

        <Button className={buttonOutlineClasses}>Add Resources</Button>
        {/* {professors.length > 0 &<p>Course Name: {course_name}</p>} */}
      </div>

      {/* Comment section */}
      <div>
        <p className="text-xl font-semibold ">Comments</p>
        <Textarea
          placeholder="Add a comment..."
          className="my-2"
          {...form.getInputProps("comment")}
        />
        <Button
          // disabled={value?.trim().length === 0 ? true : false}
          onClick={() => {}}
          className={buttonOutlineClasses}
        >
          Add Comment
        </Button>
      </div>
    </div>
  );
};
export default CourseDetails;
