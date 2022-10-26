import { Schema, model, models } from "mongoose";

const doubtSchema = new Schema({
  course_id: { type: String, required: true }, //format --> ab1234 text all uppercase, no space
  doubt: { type: String, required: true },
  title: { type: String, required: true },
  user: { type: String, required: true },
  status: { type: String, required: true, default: "PENDING" },
});

const Doubt = models.Doubt || model("Doubt", doubtSchema);

export default Doubt;
