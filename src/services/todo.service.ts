import mongoose from "mongoose";
// Models
import { Task } from "../model";
// Interfaces
import { ITodo } from "../interfaces";

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
    console.log(err);
    return false;
  }
};

//* @desc: Edit todo
export const toggleTodo = async (taskSlug: string, todoId: string) => {
  try {
    let task = await Task.findOne({ slug: taskSlug });

    if (!task) return false;

    if (task?.todos) {
      for (const todo of task.todos) {
        if (todo._id.equals(todoId)) {
          todo.isChecked = !todo.isChecked;
        }
      }
    }

    return await task.save();
  } catch (err) {
    console.log(err);
    return false;
  }
};
