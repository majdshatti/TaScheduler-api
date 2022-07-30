import { Document, ObjectId } from "mongoose";

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
  createdAt?: Date;
  updatedAt?: Date;
}

export default IProject;
