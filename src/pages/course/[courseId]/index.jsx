import { Badge, Blockquote, Button, Textarea } from "@mantine/core";
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

  // const courseData = {
  //   _id: "635c22d04658c4cc263a8c88",
  //   course_id: "ED2012",
  //   credits: "6",
  //   description:
  //     "This course will be an introduction to the principles of various manufacturing processes.  It will present both primary and secondary operations with emphasis on casting, bulk deformation, sheet metal, cutting and additive processes. ",
  //   course_type: "Theory",
  //   course_name: "Manufacturing Processes",
  //   course_content:
  //     '["Manufacturing Process Overview – primary and secondary processes, basis for selecting manufacturing processes.", "Fundamentals of Metals Casting – solidification, structure and an overview of different metal casting processes and applications.", "Fundamentals of Bulk Deformation Process – forging, extrusion and rolling.", "Sheet Metal Forming – formability of sheet metals and processes such as shearing, deep drawing and stretch forming.", "Metal Cutting Operations for producing various shapes and surface integrity – turning, milling, drilling, reaming, tapping etc.", "Additive Manufacturing Processes – Introduction to 3D printing technologies such as Direct Metal Deposition (DMD) and Selective Laser Sintering (SLS).", "Engineering Metrology – measurement of roughness, profile, and other attributes of finished parts for achieving good integrity."]',
  // };

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
        <Blockquote
          color="green"
          className="text-gray-400 w-screen sm:w-[70vw]"
        >
          {courseData.description}
        </Blockquote>
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

// import { Button, Textarea, Blockquote, Badge } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { useRouter } from "next/router";
// import { prettifyId } from "../../../utils/helper";
// import { buttonOutlineClasses } from "../../../utils/constants";
// import CommentCard from "../../../components/CommentCard";
// import SubCommentCard from "../../../components/SubCommentCard";
// import { notSignedInNotification } from "../../../utils/notification";
// import { useSession } from "next-auth/react";
// import useSwr from "swr";
// import { disableAutoRevalidate, getFetcher } from "../../../utils/swr";
// const name_id_map = require("../../../../name-id-map.json");

// const CourseDetails = () => {
//   const router = useRouter();
//   const courseId = router.query.courseId?.toUpperCase();
//   const { data: session } = useSession();

//   const { data: comments, mutate } = useSwr(
//     `/api/comment/${courseId}`,
//     getFetcher
//   );

//   const { data: courseData } = useSwr(
//     `/api/course/${courseId}`,
//     getFetcher,
//     disableAutoRevalidate
//   );
//   console.log(courseData);

//   const form = useForm({
//     initialValues: {
//       comment: "",
//     },
//     validate: {
//       comment: (value) => (value.length > 10 ? null : "Too short"),
//     },
//   });

//   const addComment = async () => {
//     if (!session) {
//       notSignedInNotification("Please sign in to comment");
//       return;
//     }
//     const validationResult = form.validate();
//     if (Object.keys(validationResult.errors).length > 0) {
//       return;
//     }
//     // setLoading(true);
//     const res = await fetch(`/api/comment/${courseId}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(form.values),
//     });

//     const data = await res.json();
//     if (data.error) {
//       // throw error notifcation
//     } else {
//       mutate();
//       //todo refetch the comments
//       // show success notification
//       form.reset();
//     }
//   };

//   if (!courseId in name_id_map) {
//     return <div>course doesnt exist</div>;
//   }

//   return (
//     <div className="flex flex-1 flex-col ">
//       <div className="flex flex-col justify-between flex-1">
//         <p className="text-3xl font-bold">{name_id_map[courseId]}</p>
//           <div>
//         <div className=" flex justify-between text-2xl text-gray-400 font-semibold">

//           <p>{courseId && prettifyId(courseId)}</p>
//           </div>
//           <div className=" flex flex-col gap-2">
//             <Badge color="green" size="lg">
//               Theory
//             </Badge>
//             <Badge color="green" size="lg">
//               Credits: 9{" "}
//             </Badge>
//           </div>
//         </div>
//         <Blockquote color="green">
//           Figures of Speech and Communicative Act-Language of persuasion:
//           Promise-Intimidation, Testimonial, Statistics, Half-truths &
//           Lies-Speech Act: Theories of Bhartihari, Searle and Austin-Language as
//           a Social Act-Communicative Competence-Systemic Functional Approach to
//           Speech-Communication in Context-Communication and the Mass Media, Art
//           of Public Speaking-Natural language and theory of communication\",
//           \"The course will acquaint students with the theory and practice of
//           using natural languages for persuasion and communication. Figures of
//           Speech and Communicative Act \u2013 Language of persuasion: Promise
//           \u2013 Intimidation Testimonial, Statistic, Half \u2013 truth& Lies
//           \u2013 Speech Act: Theories of Bhartihari, Searle and Austin \u2013
//           Language as a Social Act \u2013 Communicative Competence \u2013
//           Systemic Functional Approach to speech \u2013 Communication in Context
//           \u2013 Communication and the Mass Media, Art of Public Speaking \u2013
//           Natural language and theory of Communication
//         </Blockquote>

//         {/* courseContent": "[\"Figures of Speech and Communicative Act-Language of persuasion: Promise-Intimidation, Testimonial, Statistics, Half-truths & Lies-Speech Act: Theories of Bhartihari, Searle and Austin-Language as a Social Act-Communicative Competence-Systemic Functional Approach to Speech-Communication in Context-Communication and the Mass Media, Art of Public Speaking-Natural language and theory of communication\", \"The course will acquaint students with the theory and practice of using natural languages for persuasion and communication. Figures of Speech and Communicative Act \u2013 Language of persuasion: Promise \u2013 Intimidation Testimonial, Statistic, Half \u2013 truth& Lies \u2013 Speech Act: Theories of Bhartihari, Searle and Austin \u2013 Language as a Social Act \u2013 Communicative Competence \u2013 Systemic Functional Approach to speech \u2013 Communication in Context \u2013 Communication and the Mass Media, Art of Public Speaking \u2013 Natural language and theory of Communication\", null]",
//     "courseType": "Theory",
//     "credits": "9",
//     "deptCode": "HS",    ??????????
//     "description": "",
//     "prerequisites": "[]", ?????????
//     "referenceBooks": "[]",
//     "textBooks": "[]" */}
//         <div className="gap-2 flex flex-col sm:flex-row">
//           <a href={session ? `/course/${courseId}/new-submission` : null}>
//             <Button
//               onClick={
//                 !session
//                   ? () =>
//                       notSignedInNotification(
//                         "Please Sign in to Add a Submission"
//                       )
//                   : () => {}
//               }
//               className={buttonOutlineClasses}
//             >
//               Add Resources
//             </Button>
//           </a>
//         </div>
//         {/* {professors.length > 0 &<p>Course Name: {course_name}</p>} */}
//       </div>
//       {/* Comment section */}
//       <div className="mb-6">
//         <p className="text-xl font-semibold ">Comments</p>
//         <Textarea
//           placeholder="Add a comment..."
//           className="my-2"
//           {...form.getInputProps("comment")}
//         />
//         <Button
//           // disabled={form.values.comment?.trim().length === 0 ? true : false}
//           onClick={addComment}
//           className={buttonOutlineClasses}
//         >
//           Add Comment
//         </Button>

//         {/* comments */}
//         {/* loading banner? */}
//         <div className="space-y-4 mt-4">
//           {comments?.length > 0 &&
//             comments.map((comment, index) => (
//               <div key={index}>
//                 <CommentCard
//                   user={comment.user}
//                   comment={comment.comment}
//                   type="comment"
//                   id={courseId}
//                   parentId={comment._id}
//                   mutate={mutate}
//                 />
//                 {comment.subComments?.length > 0 &&
//                   comment.subComments.map((subComment, index) => (
//                     <SubCommentCard
//                       key={index}
//                       user={subComment.user}
//                       comment={subComment.comment}
//                     />
//                   ))}
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// };
// export default CourseDetails;
