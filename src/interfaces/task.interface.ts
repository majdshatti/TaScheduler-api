import { Document, Types } from "mongoose";

// Interface
import { ITodo } from "./";

// Task status
enum Status {
  Overdue = "Overdue",
  Completed = "Completed",
  Hold = "Hold",
  Active = "Active",
}

interface ITask {
  name: string;
  slug?: string;
  description?: string;
  status: Status;
  image?: string;
  startDate: Date;
  dueDate: Date;
  completeDate?: Date;
  todos: ITodo[];
  project: Types.ObjectId;
  user: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ITaskDocument extends ITask, Document {}

export { ITask, Status, ITaskDocument };
