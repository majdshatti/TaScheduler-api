import { Schema, model } from "mongoose";
import slugify from "slugify";
// Interfaces
import { IProjectDocument } from "../interfaces";

const projectSchema = new Schema<IProjectDocument>(
  {
    name: String,
    slug: String,
    description: String,
    status: String,
    completedTasksCount: Number,
    unCompletedTasksCount: Number,
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
  {
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

projectSchema.virtual("tasks", {
  ref: "Task",
  localField: "_id",
  foreignField: "project",
  justOne: false,
});

projectSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Project = model<IProjectDocument>("Project", projectSchema);
export default Project;
