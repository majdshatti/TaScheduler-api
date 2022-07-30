import { Schema, model } from "mongoose";
import slugify from "slugify";
// Interfaces
import { IProject } from "../interfaces";

const projectSchema = new Schema<IProject>(
  {
    name: String,
    slug: String,
    description: String,
    status: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      immutable: true,
    },
    updatedAt: Date,
  },
  { versionKey: false }
);

projectSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Project = model<IProject>("Project", projectSchema);
export default Project;
