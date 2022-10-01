// comment section
// for the COURSE SECTION

import Comments from "../../../models/comments";

export default async function handler(req, res) {
  const { courseId } = req.query;
  if (!courseId) {
    return res.status(400).json({ message: "Missing course ID" });
  }

  if (req.method === "GET") {
    await dbConnect();
    try {
      const comments = await Comments.find({
        course_id: courseId,
      })
        .lean()
        .res.status(200)
        .json({ success: true, data: comments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    await dbConnect();

    // FOR ADDING NEW COMMENT
    // user from session, comment from req.body
  }
}
