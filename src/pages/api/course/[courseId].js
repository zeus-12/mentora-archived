// for the COURSE SECTION
import dbConnect from "../../../utils/dbConnect";
import Course from "../../../models/course";
import getServerSession from "../../../utils/getServerSession";

export default async function handler(req, res) {
  const session = await getServerSession(req, res);

  if (!session) {
    res.status(401).json({ message: "Please Sign in to add a course" });
    return;
  }

  const user = session?.user?.email;
  // make sure creator email is of email format
  const { courseId } = req.query;
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    await dbConnect();
    try {
      const courseDetails = await Course.findOne({
        course_id: courseId,
      }).lean();

      res.status(200).json({ success: true, data: courseDetails });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    const { course_name, description, professors, comments, credits } =
      req.body;
    if (!course_name) {
      return res.status(400).json({ message: "Missing course details" });
    }

    await dbConnect();
    try {
      const newCourseDetails = await Course.create({
        user,
        course_name,
        course_id: courseId,
        description,
        professors,
        comments,
        credits,
      });
      res.status(200).json({ success: true, data: newCourseDetails });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
