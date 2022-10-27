import { Schema, model, models } from "mongoose";

// whether needed?
// courseContent
// courseType
// prerequisites
// referenceBooks
// textBooks

const courseSchema = new Schema({
  course_id: { type: String, required: true },
  professors: { type: Array },
  description: { type: String },
  credits: { type: Number },
  content: [
    {
      file_name: { type: String },
      file_url: { type: String },
      uploader: { type: String, required: true },
      date: { type: Date, default: Date.now },
    },
  ],
  user: { type: String, required: true },
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
