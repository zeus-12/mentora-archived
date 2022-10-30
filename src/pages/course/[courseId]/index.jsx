import { Button, Textarea, Blockquote } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { prettifyId } from "../../../utils/helper";
import { buttonOutlineClasses } from "../../../utils/constants";
import CommentCard from "../../../components/CommentCard";
import SubCommentCard from "../../../components/SubCommentCard";
import { notSignedInNotification } from "../../../utils/notification";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { disableAutoRevalidate, getFetcher } from "../../../utils/swr";
const name_id_map = require("../../../../name-id-map.json");

const CourseDetails = () => {
  const router = useRouter();
  const courseId = router.query.courseId?.toUpperCase();
  const { data: session } = useSession();

  const { data: comments, mutate } = useSwr(
    `/api/comment/${courseId}`,
    getFetcher
  );

  const { data: courseData } = useSwr(
    `/api/course/${courseId}`,
    getFetcher,
    disableAutoRevalidate
  );
  console.log(courseData);

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
      mutate();
      //todo refetch the comments
      // show success notification
      form.reset();
    }
  };

  if (!courseId in name_id_map) {
    return <div>course doesnt exist</div>;
  }

  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex justify-between flex-1">
        <div>
          <p className="text-3xl font-bold">{name_id_map[courseId]}</p>
          <p className="text-2xl text-gray-400 font-semibold">
            {courseId && prettifyId(courseId)}
          </p>
          <Blockquote color="green">Course description</Blockquote>
        </div>

        {/* courseContent": "[\"Figures of Speech and Communicative Act-Language of persuasion: Promise-Intimidation, Testimonial, Statistics, Half-truths & Lies-Speech Act: Theories of Bhartihari, Searle and Austin-Language as a Social Act-Communicative Competence-Systemic Functional Approach to Speech-Communication in Context-Communication and the Mass Media, Art of Public Speaking-Natural language and theory of communication\", \"The course will acquaint students with the theory and practice of using natural languages for persuasion and communication. Figures of Speech and Communicative Act \u2013 Language of persuasion: Promise \u2013 Intimidation Testimonial, Statistic, Half \u2013 truth& Lies \u2013 Speech Act: Theories of Bhartihari, Searle and Austin \u2013 Language as a Social Act \u2013 Communicative Competence \u2013 Systemic Functional Approach to speech \u2013 Communication in Context \u2013 Communication and the Mass Media, Art of Public Speaking \u2013 Natural language and theory of Communication\", null]",
    "courseType": "Theory",
    "credits": "9",
    "deptCode": "HS",    ??????????
    "description": "",  
    "prerequisites": "[]", ?????????
    "referenceBooks": "[]",
    "textBooks": "[]" */}
        <div className="gap-2 flex flex-col sm:flex-row">
          <a href={session ? `/course/${courseId}/new-submission` : null}>
            <Button
              onClick={
                !session
                  ? () =>
                      notSignedInNotification(
                        "Please Sign in to Add a Submission"
                      )
                  : () => {}
              }
              className={buttonOutlineClasses}
            >
              Add Resources
            </Button>
          </a>
        </div>
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
        <div className="space-y-4 mt-4">
          {comments?.length > 0 &&
            comments.map((comment, index) => (
              <div key={index}>
                <CommentCard
                  user={comment.user}
                  comment={comment.comment}
                  type="comment"
                  id={courseId}
                  parentId={comment._id}
                  mutate={mutate}
                />
                {comment.subComments?.length > 0 &&
                  comment.subComments.map((subComment, index) => (
                    <SubCommentCard
                      key={index}
                      user={subComment.user}
                      comment={subComment.comment}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default CourseDetails;
