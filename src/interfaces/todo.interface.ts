import mongoose from "mongoose";

interface ITodo extends Document {
  _id: mongoose.Types.ObjectId;
  paragraph: string;
  isChecked?: boolean;
}

export default ITodo;
