import { Request, Response, NextFunction } from "express";

// Middlewares
import asyncHandler from "../middleware/async";
import { validationResult } from "express-validator";

// Services
import { getAllTasks, createTask } from "../services/task.service";

// Interfaces
import IResponse from "../interfaces/response.interface";
import ITask from "../interfaces/task.interface";
import ErrorResponse from "../utils/error/errorResponse";

export const getTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    } as IResponse)
  }
);

export const addTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get body params
    const { name, description, startDate, dueDate } = req.body as ITask;

    const taskBody = {
      name,
      description,
      startDate,
      dueDate,
      status: "Hold",
    } as ITask;

    // Creating task
    const task = await createTask(taskBody);

    return res.status(201).json({
      success: true,
      message: "Task added.",
      data: task,
    } as IResponse);
  }
);
