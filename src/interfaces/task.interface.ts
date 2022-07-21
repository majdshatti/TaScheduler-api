import { Document, ObjectId } from "mongoose";

import { ITodo } from "./";

enum Status {
  Overdue = "Overdue",
  Completed = "Completed",
  Hold = "Hold",
  Active = "Active",
}

interface ITask extends Document {
  name: string;
  slug?: string;
  description?: string;
  status: Status;
  image?: string;
  startDate: Date;
  dueDate: Date;
  completeDate?: Date;
  todos: ITodo[];
  project: ObjectId;
  user: ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export { ITask, ITodo, Status };
