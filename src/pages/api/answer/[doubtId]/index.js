// main comment
import Answer from "../../../../models/answer";
import dbConnect from "../../../../utils/dbConnect";
import getServerSession from "../../../../utils/getServerSession";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { doubtId } = req.query;
    const { answer } = req.body;
    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "Please Sign in to add a course" });
      return;
    }
    const user = session?.user?.email;
    try {
      await dbConnect();
      const newAnswer = await Answer.create({
        doubt_id: doubtId,
        answer,
        user,
      });

      res.status(200).json({ success: "success", data: newAnswer });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const { doubtId } = req.query;
    try {
      await dbConnect();
      const answers = await Answer.find({
        doubt_id: doubtId,
      }).lean();

      res.status(200).json({ success: "success", data: answers });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json({ error: "Invalid request" });
  }
}
