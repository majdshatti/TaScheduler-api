import mongoose from "mongoose";
// Models
import { Task } from "../model";
// Interfaces
import { ITask, ITodo } from "../interfaces";

//* @desc: Add todo to task
export const pushTodo = async (taskSlug: string, paragraph: string) => {
  const todo = {
    _id: new mongoose.Types.ObjectId(),
    paragraph,
    isChecked: false,
  } as ITodo;

  try {
    const task = await Task.findOneAndUpdate(
      { slug: taskSlug },
      { $push: { todos: todo } },
      { new: true }
    );

    if (!task) return false;

    return task;
  } catch (err) {
    return false;
  }
};

//* @desc: Remove Todo from task
export const pullTodo = async (taskSlug: string, todoId: string) => {
  try {
    const task = await Task.findOneAndUpdate(
      { slug: taskSlug },
      { $pull: { todos: { _id: todoId } } },
      { new: true }
    );

    if (!task) return false;

    return task;
  } catch (err) {
    return false;
  }
};

//* @desc: Edit todo
export const toggleTodo = async (task: ITask, todoIndex: number) => {
  try {
    task.todos[todoIndex].isChecked = !task.todos[todoIndex].isChecked;
    task.markModified("todos");

    return await task.save();
  } catch (err) {
    return Promise.reject("");
  }
};
