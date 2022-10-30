import { Schema, model, models } from "mongoose";

// "course_id": "AS5590",
// "course_content": "[\"Modeling (16 Lectures): Equations for flight dynamics (point-mass);Gliding flight, equivalence to thermal soaring;Flight in wind shear;Theory of dynamic soaring;Dynamic soaring of birds, different patterns.\", \"Simulation (14 Lectures):Brief introduction to pseudo-spectral methods;Concept of Differential flatness;Optimization and trajectory generation.\", \"Control (10 Lectures):Stability augmentation;Model predictive control.\"]",
// "course_name": "Dynamic soaring",
// "course_type": "Theory",
// "credits": "9",
// "description"

const courseSchema = new Schema({
  course_id: { type: String, required: true },
  credits: { type: String },
  description: { type: String },
  course_type: { type: String },
  course_name: { type: String, required: true },
  course_content: { type: String },
});

const Course = models.Course || model("Course", courseSchema);

export default Course;
