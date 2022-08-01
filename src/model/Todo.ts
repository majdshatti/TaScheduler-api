import { Schema, model } from "mongoose";

import { ITodoDocument } from "./../interfaces";

const todoSchema = new Schema<ITodoDocument>(
  {
    paragraph: String,
    isChecked: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false }
);

const Todo = model<ITodoDocument>("Todo", todoSchema);

export { Todo, todoSchema };
