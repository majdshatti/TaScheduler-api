import slugify from "slugify";
// Models
import { Task } from "../model";
// Interfaces
import { ITaskDocument, Status } from "../interfaces";

//* @desc: Get all tasks service
export const getAllTasks = () => {
  return Task.find().populate("user");
};

//* @desc: Get single task service
export const getTaskById = (id: string) => {
  return Task.findOne({ _id: id }).populate("user project");
};

//* @desc: Create a task service
export const addTask = (data: ITaskDocument): Promise<ITaskDocument> => {
  return Task.create(data);
};

//* @desc: Update a task service
export const updateTask = async (id: string, body: ITaskDocument) => {
  let { name, description } = body;

  const updateObject = {
    name: name ?? undefined,
    slug: name ? slugify(name, { lower: true }) : undefined,
    description: description ?? undefined,
    updatedAt: new Date(),
  };

  return Task.findOneAndUpdate({ _id: id }, updateObject, {
    new: true,
  });
};

//* @desc: Delete a task service
export const deleteTaskById = async (id: string) => {
  return Task.findOneAndRemove({ _id: id });
};

//* @desc: Update the status of a task
export const changeStatus = async (task: ITaskDocument, status: Status) => {
  return Task.findOneAndUpdate(
    { _id: task._id },
    { status: status, updatedAt: new Date() },
    { new: true }
  );
};
