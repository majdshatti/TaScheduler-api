import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import {
  getAllTasks,
  getTaskBySlug,
  addTask,
  updateTask,
  deleteTaskBySlug,
  changeStatus,
} from "../services/task.service";
// Interfaces
import { IResponse, ITask, Status } from "../interfaces";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";

//* @desc Get all tasks
//* @route GET /api/task
//* @access private
export const getTasks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const tasks = await getAllTasks();

    res.status(200).json({
      success: true,
      data: tasks,
    } as IResponse);
  }
);

//* @desc Get a single task by slug
//* @route GET /api/task/:slug
//* @access private
export const getSingleTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const task = await getTaskBySlug(slug);

    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    res.status(200).json({
      success: true,
      data: task,
    } as IResponse);
  }
);

//* @desc Create a task
//* @route POST /api/task
//* @access private
export const createTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Get body params
    const bodyObject = req.body as ITask;

    // Creating task
    const task = await addTask(bodyObject);

    return res.status(201).json({
      success: true,
      message: getSuccessMessage("create", "task"),
      data: task,
    } as IResponse);
  }
);

//* @desc Create a task
//* @route POST /api/task
//* @access private
export const editTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    // Get body params
    const bodyObject = req.body as ITask;

    // Update task
    const task = await updateTask(slug, bodyObject);

    return res.status(201).json({
      success: true,
      message: getSuccessMessage("edit", "task"),
      data: task,
    } as IResponse);
  }
);

//* @desc Delete a task
//* @route DELETE /api/task/:slug
//* @access private
export const deleteTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    // delete task
    const isDeleted = await deleteTaskBySlug(slug);

    if (!isDeleted)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    return res.status(201).json({
      success: true,
      message: getSuccessMessage("delete", "task"),
    } as IResponse);
  }
);

//* @desc Change a task status
//* @route PUT /api/task/:slug/stauts
//* @access private
export const completeTask = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let task = req.body.validationResults.Task;

    task = await changeStatus(task, Status.Completed);

    return res.status(201).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    } as IResponse);
  }
);
