// for the COURSE SECTION

import Course from "../../../models/course";

export default async function handler(req, res) {
  console.log(req.body);
  const { courseId } = req.query;
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    await dbConnect();
    try {
      const courseDetails = await Course.findOne({
        course_id: courseId,
      })
        .lean()
        .res.status(200)
        .json({ success: true, data: courseDetails });
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
        course_name,
        course_id: courseId,
        description,
        professors,
        comments,
        credits,
      })
        .lean()
        .res.status(200)
        .json({ success: true, data: newCourseDetails });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
