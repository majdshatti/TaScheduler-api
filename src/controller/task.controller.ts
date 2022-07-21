import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import { getAllTasks, createTask } from "../services/task.service";
// Interfaces
import { IResponse, ITask } from "../interfaces";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";

export const getTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    } as IResponse);
  }
);

export const addTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get body params
    const bodyObject = req.body as ITask;

    // Creating task
    const task = await createTask(bodyObject);

    return res.status(201).json({
      success: true,
      message: getSuccessMessage("create", "task"),
      data: task,
    } as IResponse);
  }
);
