import { Types } from "mongoose";
import Doubt from "../../../models/doubt";
import dbConnect from "../../../utils/dbConnect";

export default async function handler(req, res) {
  const { doubtId } = req.query;

  if (req.method === "GET") {
    await dbConnect();
    try {
      const doubt = await Doubt.findOne({ _id: Types.ObjectId(doubtId) })
        .select("title course_id doubt")
        .lean();
      return res.status(200).json({ message: "success", data: doubt });
    } catch {
      return res.status(400).json({ error: "error" });
    }
  } else {
    return res.status(400).json({ error: "Invalid request" });
  }
}
