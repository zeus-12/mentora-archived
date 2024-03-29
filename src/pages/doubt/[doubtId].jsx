import { Button, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CommentCard from "../../components/Common/CommentCard";
import LoaderComponent from "../../components/UI/LoaderComponent";
import SubCommentCard from "../../components/Common/SubCommentCard";
import { buttonOutlineClasses } from "../../lib/constants";
import { postRequestConfig, prettifyId } from "../../utils/helper";
import {
  errorNotification,
  notSignedInNotification,
  successNotification,
} from "../../utils/notification";
import useSWR from "swr";
import { getFetcher } from "../../configs/swrConfig";

const idNameMapping = require("../../../name-id-map.json");

const DoubtDetailsPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user?.email;

  const { doubtId } = router.query;

  const { data: answers, mutate } = useSWR(
    `/api/answer/${doubtId}`,
    getFetcher
  );

  const form = useForm({
    initialValues: {
      answer: "",
    },
    validate: {
      answer: (value) => (value.length > 10 ? null : "Too short"),
    },
  });

  const addAnswer = async () => {
    if (!session) {
      notSignedInNotification("Please sign in to Answer");
      return;
    }
    const validationResult = form.validate();
    if (Object.keys(validationResult.errors).length > 0) {
      return;
    }

    const res = await fetch(`/api/answer/${doubtId}`, {
      ...postRequestConfig,
      body: JSON.stringify(form.values),
    });

    const data = await res.json();
    if (data.error) {
      errorNotification("Something went wrong!");
    } else {
      mutate();
      successNotification("Successfully added!");
      form.reset();
    }
  };

  const { data: doubt, mutate: mutateDoubtData } = useSWR(
    `/api/doubt/${doubtId}`,
    getFetcher
  );

  const resolveDoubt = async () => {
    if (!doubtId || !session || doubt.user !== user) {
      return;
    }

    const res = await fetch(`/api/doubt/${doubtId}/resolve`, { method: "PUT" });
    const updatedDoubtData = await res.json();

    if (updatedDoubtData.error) {
      errorNotification("Something went wrong!");
      return;
    }
    successNotification("Doubt marked as resolved!");
    mutateDoubtData();
  };

  if (!doubt)
    return (
      <div className="flex flex-1">
        <LoaderComponent />
      </div>
    );
  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-1 justify-between">
        <div className="">
          <p className="text-3xl mb-2 font-bold">
            {prettifyId(doubt.course_id)}:{" "}
            <span className="text-gray-500">
              {idNameMapping[doubt.course_id?.toUpperCase()]}
            </span>
          </p>
          <p className="text-2xl font-semibold">{doubt.title}</p>
          <p className="text-xl text-gray-400">{doubt.doubt}</p>
        </div>

        {user === doubt.user && doubt.status === "PENDING" && (
          <Button onClick={resolveDoubt} className={buttonOutlineClasses}>
            Mark as Resolved
          </Button>
        )}

        {doubt.status === "RESOLVED" && (
          <p className="text-green-500 font-semibold">Resolved</p>
        )}
      </div>

      <div className="">
        <p className="text-xl font-semibold ">Answers</p>
        <Textarea
          placeholder="Wanna answer the question?"
          className="my-2"
          {...form.getInputProps("answer")}
        />
        <Button onClick={addAnswer} className={buttonOutlineClasses}>
          Add Answer
        </Button>

        <div className="space-y-4 mt-4">
          {answers?.length > 0 &&
            answers?.map((answer, index) => (
              <div key={index}>
                <CommentCard
                  session={session}
                  like_count={answer.like_count}
                  liked={answer.liked}
                  _id={answer._id}
                  user={answer.user}
                  comment={answer.answer}
                  type="answer"
                  id={doubtId}
                  parentId={answer._id}
                  mutate={mutate}
                />
                {answer?.subAnswers?.length > 0 &&
                  answer.subAnswers.map((subAnswer, index) => (
                    <SubCommentCard
                      like_count={subAnswer.like_count}
                      liked={subAnswer.liked}
                      mutate={mutate}
                      type="answer"
                      _id={subAnswer._id}
                      session={session}
                      key={index}
                      user={subAnswer.user}
                      comment={subAnswer.answer}
                    />
                  ))}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default DoubtDetailsPage;
