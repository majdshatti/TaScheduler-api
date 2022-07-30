import slugify from "slugify";
// Models
import { Task } from "../model";
// Interfaces
import { ITask, Status } from "../interfaces";
import { getErrorMessage } from "../utils";

//* @desc: Get all tasks service
export const getAllTasks = () => {
  return Task.find().populate("user");
};

//* @desc: Get single task service
export const getTaskBySlug = (slug: string) => {
  return Task.findOne({ slug }).populate("user project");
};

//* @desc: Create a task service
export const addTask = (data: ITask): Promise<ITask> => {
  return Task.create(data);
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

//* @desc: Update the status of a task
export const changeStatus = async (task: ITask, status: Status) => {
  try {
    return Task.findOneAndUpdate(
      { _id: task._id },
      { status: status },
      { new: true }
    );
  } catch (err) {
    Promise.reject({
      name: "Service Error",
      multiLangMessage: getErrorMessage("operation", "complete task"),
    });
  }
};
