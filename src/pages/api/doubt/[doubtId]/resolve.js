import { Types } from "mongoose";
import Doubt from "../../../../models/doubt";
import dbConnect from "../../../../lib/dbConnect";
import getServerSession from "../../../../utils/getServerSession";

export default async function handler(req, res) {
  const { doubtId } = req.query;

  if (req.method === "PUT") {
    const session = await getServerSession(req, res);
    if (!session) {
      return res.status(401).json({ error: "Not logged in" });
    }
    const user = session?.user?.email;

    await dbConnect();

    try {
      const doubt = await Doubt.findOneAndUpdate(
        { _id: Types.ObjectId(doubtId), user: user },
        { status: "RESOLVED" },
        { new: true }
      ).lean();
      return res.status(200).json({ message: "success", data: doubt });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    return res.status(400).json({ error: "Invalid request" });
  }
}
