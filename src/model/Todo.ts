import { Schema, model } from "mongoose";

import { ITodo } from "./../interfaces";

const todoSchema = new Schema<ITodo>(
  {
    paragraph: String,
    isChecked: Boolean,
  },
  { versionKey: false }
);

const Todo = model<ITodo>("Todo", todoSchema);

export { Todo, todoSchema };
