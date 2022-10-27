// for the search bar

import Course from "../../../models/course";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  return;

  // const query = req.query.q;

  // if (!query) {
  //   return res.status(400).json({ message: "Missing search query" });
  // }

  if (req.method === "GET") {
    await dbConnect();
    try {
      // get courses name/id matching the query
      const courses = await Course.find({})
        .select("course_name course_id")
        .lean();

      res.status(200).json({ success: true, data: courses });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    await dbConnect();
    // course_id, course_name, professors, description, comments, credits
    // not course contents
    // FOR ADDING NEW COURSE
  }
}
