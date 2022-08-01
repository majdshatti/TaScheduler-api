import { Schema, model, Query } from "mongoose";

// Schemas
import { todoSchema } from "./";
// Interfaces
import { ITaskDocument, Status } from "./../interfaces";
// Services
import { countProjectTasks } from "../services/project.service";
// Utils
import slugify from "slugify";

//* Task Schema
const taskSchema = new Schema<ITaskDocument>(
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

// Auto set slug, updatedAt and initial status before saving document
taskSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  this.slug = slugify(this.name, { lower: true });
  this.status = setInitStatus(this.startDate, this.dueDate);

  next();
});

// After saving, change the project completion counts
taskSchema.post("save", async function () {
  await countProjectTasks(this.project);
});

// Set an initial value for the status of a task
const setInitStatus = function (sDate: Date, eDate: Date) {
  let initStatus = Status.Active;
  const startDate = new Date(sDate).getTime();
  const dueDate = new Date(eDate).getTime();
  const currentDate = new Date().getTime();

  if (currentDate < startDate) initStatus = Status.Hold;
  if (currentDate > dueDate) initStatus = Status.Overdue;

  return initStatus;
};

const Task = model<ITaskDocument>("Task", taskSchema);
export default Task;
