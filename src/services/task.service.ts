// Models
import Task from "../model/Task";

// Interface
import ITask from "../interfaces/task.interface";
import IResponse from "../interfaces/response.interface";

export const getAllTasks = () => {
  return Task.find();
};

export const createTask = (data: ITask): Promise<ITask> => {
  return Task.create({
    name: data.name,
    description: data.description,
  });
};
