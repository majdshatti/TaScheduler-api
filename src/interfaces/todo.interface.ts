import { Document, Types } from "mongoose";

interface ITodo extends Document {
  paragraph: string;
  isChecked?: boolean;
}

interface ITodoDocument extends ITodo, Document {}

export { ITodo, ITodoDocument };
