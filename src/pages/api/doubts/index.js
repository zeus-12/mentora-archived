import Doubt from "../../../models/doubt";
import dbConnect from "../../../utils/dbConnect";
import getServerSession from "../../../utils/getServerSession";

export default async function handler(req, res) {
  if (req.method === "GET") {
    await dbConnect();
    try {
      const doubts = await Doubt.find();
      return res.status(200).json({ message: "success", data: doubts });
    } catch {
      return res.status(400).json({ error: "error" });
    }
  } else if (req.method === "POST") {
    const { course_id, doubt, title } = req.body;

    if (!course_id || !doubt || !title) {
      return res.status(400).json({ error: "Missing fields" });
    }

    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const user = session?.user?.email;

    try {
      await dbConnect();

      const newDoubt = await Doubt.create({
        course_id,
        doubt,
        user,
        title,
      });

      return res.status(200).json({ message: "success", data: newDoubt });
    } catch (err) {
      console.log(err);
      return res.status(400).json({ error: "error" });
    }
  }
}
