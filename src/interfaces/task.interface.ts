import { Document } from 'mongoose';

enum Status {
  Overdue = "Overdue",
  Completed = "Completed",
  Hold = "Hold",
}

interface taskInterface extends Document {
  name: string;
  slug: string;
  description?: string;
  status: Status;
  image?: string;
  startDate: Date;
  dueDate: Date;
  completeDate?: Date;
  createdAt:Date;
  updatedAt:Date;
}

export default taskInterface;
