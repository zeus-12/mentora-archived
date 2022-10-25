import { Schema, model, models } from "mongoose";

const commentSchema = new Schema(
  {
    course_id: { type: String, required: true }, //format --> ab1234 text all uppercase, no space
    user: { type: String, required: true },
    // link it with users model?
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    parent_id: { type: String },
  }
  // { timestamps: true }
);

const Comment = models.Comment || model("Comment", commentSchema);

export default Comment;
