// fetch all comments for a particular course
import getServerSession from "../../../../utils/getServerSession";
import Comments from "../../../../models/comment";
import dbConnect from "../../../../utils/dbConnect";

export default async function handler(req, res) {
  console.log("here");
  const { courseId } = req.query;
  console.log(courseId);
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    await dbConnect();
    try {
      const comments = await Comments.find({
        course_id: courseId,
      }).lean();

      res.status(200).json({ success: true, data: comments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    await dbConnect();
    const { comment } = req.body;
    console.log(comment);
    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "Please Sign in to add a course" });
      return;
    }
    const user = session?.user?.email;

    try {
      const newComment = await Comments.create({
        user,
        course_id: courseId,
        comment,
      });
      res.status(200).json({ success: true, data: newComment });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }
}
