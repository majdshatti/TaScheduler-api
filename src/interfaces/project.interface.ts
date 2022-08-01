import { Document, Types } from "mongoose";

import { ITask } from "./";
enum Status {
  Completed = "Completed",
  Deleted = "Deleted",
  Hold = "Hold",
}

interface IProject {
  name: string;
  slug?: string;
  description?: string;
  status: Status;
  user: Types.ObjectId;
  completedTasksCount: number;
  unCompletedTasksCount: number;
  createdAt?: Date;
  updatedAt?: Date;
  tasks: ITask[];
}

interface IProjectDocument extends IProject, Document {}

export { IProject, IProjectDocument };
