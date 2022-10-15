import { Schema, model, models } from "mongoose";

const courseSchema = new Schema(
  {
    course_id: { type: String, required: true }, //format --> ab1234 all lowercase, no space
    course_name: { type: String, required: true },
    professors: { type: Array },
    description: { type: String },
    comments: { type: Array },
    credits: { type: Number },
    content: [
      {
        file_name: { type: String },
        file_type: { type: String },
        file_url: { type: String },
        uploader: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const Course = models.Course || model("Course", courseSchema);

export default Course;
