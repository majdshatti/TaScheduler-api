import { Schema, model } from "mongoose";
import slugify from "slugify";

import { ITask, ITodo, Status } from "./../interfaces";

const todoSchema = new Schema<ITodo>(
  {
    name: String,
    slug: String,
    isChecked: Boolean,
  },
  { _id: false, versionKey: false }
);

const taskSchema = new Schema<ITask>(
  {
    name: String,
    slug: String,
    description: String,
    status: String,
    image: String,
    startDate: Date,
    completeDate: Date,
    dueDate: Date,
    todos: [todoSchema],
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      immutable: true,
      default: () => new Date(),
    },
    updatedAt: Date,
  },
  { versionKey: false }
);

taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });

  let status = Status.Hold;

  const startDate = new Date(this.startDate).getTime();
  const currentDate = new Date().getTime();

  if (startDate <= currentDate) status = Status.Active;

  this.status = Status.Active;

  next();
});

const Task = model<ITask>("Task", taskSchema);
export default Task;
