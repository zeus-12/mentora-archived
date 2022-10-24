import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { prettifyId } from "../../../utils/helper";
import { buttonOutlineClasses } from "../../../utils/tailwindClasses";
import CommentCard from "../../../components/CommentCard";
import SubCommentCard from "../../../components/SubCommentCard";
import { notSignedInNotification } from "../../../utils/notification";
import { useSession } from "next-auth/react";

const CourseDetails = () => {
  const router = useRouter();
  const { courseId } = router.query;
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [courseData, setCourseData] = useState({});

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      const res = await fetch(`/api/course/${courseId}`);
      const data = await res.json();
      setCourseData(data.data);
    };
    fetchCourseData();
  }, [courseId]);

  const pushSubCommentsToParent = (comments) => {
    if (!comments) return;

    comments.forEach((comment) => {
      if (comment.parent_id) {
        const parentComment = comments.find((c) => c._id === comment.parent_id);
        if (parentComment) {
          if (!parentComment.subComments) parentComment.subComments = [];
          parentComment.subComments.push(comment);
          comments = comments.filter((c) => c._id !== comment._id);
        }
      }
    });

    setComments(comments);
    console.log(comments);
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      const res = await fetch(`/api/comment/${courseId}`);
      const data = await res.json();
      pushSubCommentsToParent(data.data);
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

  const addComment = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to comment");
      return;
    }
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }
    // setLoading(true);
    const res = await fetch(`/api/comment/${courseId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    if (data.error) {
      // throw error notifcation
    } else {
      //todo refetch the comments
      // show success notification
      form.reset();
    }
  };

  // console.log(Object.keys(courseData).length);
  // if (Object.keys(courseData).length === 0) {
  //   return <LoaderComponent />;
  // }

  return (
    <div className="flex flex-col min-h-[90vh]">
      <div className="flex justify-between flex-1">
        <div>
          <p className="text-3xl font-bold">{courseData?.course_name}</p>
          <p className="text-2xl font-semibold">
            {courseData?.course_id && prettifyId(courseData?.course_id)}
          </p>
        </div>

        <Link
          // todo fix this
          href={`/course/${courseId}/new-submission`}
          // href={!session ? `/course/${courseId}/new-submission` : ""}
          // href={
          //   session
          //     ? {
          //         pathname: "/course/[slug]/new-submission",
          //         query: { slug: courseId },
          //       }
          //     : ""
          // }
          passHref
        >
          <Button
            onClick={
              !session
                ? () => notSignedInNotification("Please sign in to comment")
                : () => {}
            }
            className={buttonOutlineClasses}
          >
            Add Resources
          </Button>
        </Link>
        {/* {professors.length > 0 &<p>Course Name: {course_name}</p>} */}
      </div>

      {/* Comment section */}
      <div className="mb-6">
        <p className="text-xl font-semibold ">Comments</p>
        <Textarea
          placeholder="Add a comment..."
          className="my-2"
          {...form.getInputProps("comment")}
        />
        <Button
          // disabled={form.values.comment?.trim().length === 0 ? true : false}
          onClick={addComment}
          className={buttonOutlineClasses}
        >
          Add Comment
        </Button>

        {/* comments */}
        {/* loading banner? */}
        <div className="space-y-8 mt-4">
          {comments?.length > 0 &&
            comments.map((comment, index) => (
              <div key={index}>
                <CommentCard comment={comment} />
                {comment.subComments?.length > 0 &&
                  comment.subComments.map((subComment, index) => (
                    <SubCommentCard key={index} comment={subComment} />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
