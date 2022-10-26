import Buddy from "../../../models/buddy";
import dbConnect from "../../../utils/dbConnect";
import getServerSession from "../../../utils/getServerSession";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let { course_id, message, buddyType, money } = req.body;

    if (!money) {
      money = 0;
    }
    if (!course_id || !message || !buddyType) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const session = await getServerSession(req, res);
    const user = session?.user?.email;

    try {
      await dbConnect();
      const newBuddy = await Buddy.create({
        course_id,
        message,
        user,
        buddyType,
        money,
      });

      return res.status(200).json({ success: "success", data: newBuddy });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      await dbConnect();
      const buddyDetails = await Buddy.find().lean();

      return res.status(200).json({ message: "success", data: buddyDetails });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
