import { Schema, model } from "mongoose";
import slugify from "slugify";

import ITask from "./../interfaces/task.interface";

const taskSchema = new Schema<ITask>({
  name: {
    type: String,
  },
  slug: {
    type: String,
  },
  description: {
    type: String
  },
  status: String,
  image: {
    type: String
  },
  startDate: Date,
  completeDate: Date,
  dueDate: Date,
  createdAt: {
    type: Date,
    immutable: true,
    default: () => new Date(),
  },
  updatedAt: Date,
});

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
