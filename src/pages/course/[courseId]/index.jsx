import { Badge, Blockquote, Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useRouter } from "next/router";
import { postRequestConfig, prettifyId } from "../../../utils/helper";
import { buttonOutlineClasses } from "../../../lib/constants";
import CommentCard from "../../../components/Common/CommentCard";
import SubCommentCard from "../../../components/Common/SubCommentCard";
import { notSignedInNotification } from "../../../utils/notification";
import { useSession } from "next-auth/react";
import useSwr from "swr";
import { disableAutoRevalidate, getFetcher } from "../../../configs/swrConfig";
import FilePreview from "../../../components/Common/FilePreview";
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

  const { data: courseResources } = useSwr(
    `/api/resource/${courseId}`,
    getFetcher
  );

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

    const res = await fetch(`/api/comment/${courseId}`, {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Something went wrong!");
    } else {
      mutate();
      form.reset();
    }
  };

  if (!courseId in name_id_map) {
    return <div>course doesnt exist</div>;
  }

  return (
    <div className="flex flex-1 flex-col ">
      <div className="flex-1">
        <div className="flex justify-between">
          <div className="">
            <p className="text-3xl text-gray-200 font-bold">
              {name_id_map[courseId]}
            </p>
            <p className="text-2xl text-gray-400 font-semibold">
              {courseId && prettifyId(courseId)}
            </p>
          </div>

          <div className="flex flex-col items-center gap-2">
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
            <div className="flex gap-2">
              <Badge color="green" size="lg">
                Theory
              </Badge>
              <Badge color="green" size="lg">
                Credits: 9{" "}
              </Badge>
            </div>
          </div>
        </div>
        {courseData?.description && (
          <Blockquote color="green" className="text-gray-400 sm:w-[70vw]">
            {courseData?.description}
          </Blockquote>
        )}

        {/* course resources */}
        <div className="flex flex-wrap gap-2">
          {courseResources &&
            courseResources?.resources?.map((resource, index) => (
              <a
                href={resource.file_url}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <FilePreview file={resource} />
              </a>
            ))}
        </div>
      </div>

      {/* Comment section */}
      <div className="mb-6">
        <p className="text-xl font-semibold ">Comments</p>
        <Textarea
          placeholder="Add a comment..."
          className="my-2"
          {...form.getInputProps("comment")}
        />
        <Button onClick={addComment} className={buttonOutlineClasses}>
          Add Comment
        </Button>

        <div className="space-y-4 mt-4">
          {comments?.length > 0 &&
            comments.map((comment, index) => (
              <div key={index}>
                <CommentCard
                  session={session}
                  like_count={comment.like_count}
                  liked={comment.liked}
                  _id={comment._id}
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
                      like_count={subComment.like_count}
                      liked={subComment.liked}
                      mutate={mutate}
                      _id={subComment._id}
                      type="comment"
                      session={session}
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
