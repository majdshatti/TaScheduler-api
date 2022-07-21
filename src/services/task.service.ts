import slugify from "slugify";
// Models
import { Task } from "../model";
// Interfaces
import { ITask } from "../interfaces";

//* @desc: Get all tasks service
export const getAllTasks = () => {
  return Task.find();
};

//* @desc: Get single task service
export const getTaskBySlug = (slug: string) => {
  return Task.findOne({ slug });
};

//* @desc: Create a task service
export const addTask = (data: ITask): Promise<ITask> => {
  return Task.create({
    name: data.name,
    description: data.description,
  });
};

//* @desc: Update a task service
export const updateTask = async (slug: string, body: ITask) => {
  let { name, description } = body;

  const updateObject = {
    name: name ?? undefined,
    slug: name ? slugify(name, { lower: true }) : undefined,
    description: description ?? undefined,
    updatedAt: new Date(),
  };

  try {
    return await Task.findOneAndUpdate({ slug }, updateObject, {
      new: true,
    });
  } catch (err) {
    return false;
  }
};

//* @desc: Delete a task service
export const deleteTaskBySlug = async (slug: string) => {
  try {
    const isDeleted = await Task.findOneAndRemove({ slug });
    if (!isDeleted) return false;
    return true;
  } catch (err) {
    return false;
  }
};
