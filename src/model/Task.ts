import { Schema, model } from "mongoose";
import slugify from "slugify";

// Schemas
import { todoSchema } from "./";
// Interfaces
import { ITask, Status } from "./../interfaces";
// Services
import { countProjectTasks } from "../services/project.service";

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
    todos: {
      type: [todoSchema],
    },
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
  this.status = setInitStatus(this.startDate, this.dueDate);

  next();
});

taskSchema.post("save", async function () {
  await countProjectTasks(this.project);
});

//* @desc Set an initial value for the status of a task
const setInitStatus = function (sDate: Date, eDate: Date) {
  let initStatus = Status.Active;
  const startDate = new Date(sDate).getTime();
  const dueDate = new Date(eDate).getTime();
  const currentDate = new Date().getTime();

  if (currentDate < startDate) initStatus = Status.Hold;
  if (currentDate > dueDate) initStatus = Status.Overdue;

  return initStatus;
};

const Task = model<ITask>("Task", taskSchema);
export default Task;
