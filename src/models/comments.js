import { Schema, model, models } from "mongoose";

const commentsSchema = new Schema(
  {
    course_id: { type: String, required: true }, //format --> ab1234 all lowercase, no space
    comments: [
      {
        user: { type: String, required: true },
        // link it with users model?
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const Comments = models.comments || model("Comments", commentsSchema);

export default Comments;
