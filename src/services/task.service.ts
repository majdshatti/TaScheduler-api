// Models
import Task from "../model/Task";

// Interfaces
import { ITask, IResponse } from "../interfaces";

export const getAllTasks = () => {
  return Task.find();
};

export const createTask = (data: ITask): Promise<ITask> => {
  return Task.create({
    name: data.name,
    description: data.description,
  });
};
