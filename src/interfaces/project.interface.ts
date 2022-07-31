import { Document, ObjectId } from "mongoose";

import { ITask } from "./";
enum Status {
  Completed = "Completed",
  Deleted = "Deleted",
  Hold = "Hold",
}

interface IProject extends Document {
  name: string;
  slug?: string;
  description?: string;
  status: Status;
  user: ObjectId;
  completedTasksCount: number;
  unCompletedTasksCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  tasks: ITask[];
}

export default IProject;
