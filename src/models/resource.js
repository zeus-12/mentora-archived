import { Schema, model, models } from "mongoose";

const resourceSchema = new Schema({
  course_id: { type: String, required: true }, //format --> ab1234 text all uppercase, no space
  resources: [
    {
      file_name: { type: String },
      file_type: { type: String },
      file_url: { type: String },
      //   uploader: { type: String, required: true },
    },
  ],
});

const Resource = models.Resource || model("Resource", resourceSchema);

export default Resource;
