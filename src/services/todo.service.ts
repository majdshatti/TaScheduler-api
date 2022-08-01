import mongoose from "mongoose";
// Models
import { Task } from "../model";
// Interfaces
import { ITaskDocument, ITodo, ITodoDocument } from "../interfaces";
// Utils
import { getErrorMessage } from "../utils";

//* @desc: Add todo to task
export const pushTodo = async (task: ITaskDocument, paragraph: string) => {
  const todo = {
    _id: new mongoose.Types.ObjectId(),
    paragraph,
    isChecked: false,
  } as ITodoDocument;

  const newTask = await Task.findOneAndUpdate(
    { id: task._id },
    { $push: { todos: todo } },
    { new: true }
  );

  return newTask;
};

//* @desc: Remove Todo from task
export const pullTodo = async (task: ITaskDocument, todoIndex: number) => {
  task.todos.splice(todoIndex, 1);
  task.markModified("todos");

  return task.save();
};

//* @desc: Edit todo isChecked
export const toggleTodo = async (task: ITaskDocument, todoIndex: number) => {
  task.todos[todoIndex].isChecked = !task.todos[todoIndex].isChecked;
  task.markModified("todos");

  return task.save();
};

//* @desc: Edit todo
export const editTodo = async (
  task: ITaskDocument,
  todoIndex: number,
  data: ITodo
) => {
  task.todos[todoIndex].paragraph = data.paragraph;

  return Task.findOneAndUpdate(task._id, task, { new: true });
};
