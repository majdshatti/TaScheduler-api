import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import {
  addTask,
  updateTask,
  deleteTaskById,
  changeStatus,
  getTaskById,
} from "../services/task.service";
import { countProjectTasks } from "../services/project.service";
// Interfaces
import {
  IResponse,
  ITask,
  Status,
  IFilterResponse,
  IAuthRequest,
} from "../interfaces";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";

//* @desc Get all tasks that belongs to logged in user
//* @route GET /api/task
//* @access `REGISTERED USER`
export const getTasks = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    // Return results of filter middleware
    res.status(200).send(res.filter);
  }
);

//* @desc Get a single task by id
//* @route GET /api/task/:id
//* @access `REGISTERED USER`
export const getSingleTask = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;

    // Get task
    const task = await getTaskById(taskId);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    res.status(200).json({
      success: true,
      data: task,
    } as IResponse);
  }
);

//* @desc Create a task
//* @route POST /api/task
//* @access `REGISTERED USER`
export const createTask = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // Assign logged in user id to body to be attached with the created task
    req.body.user = req.user._id;

    // Creating task
    const task = await addTask(req.body);

    res.status(201).json({
      success: true,
      message: getSuccessMessage("create", "task"),
      data: task,
    } as IResponse);
  }
);

//* @desc Edit a task by Id
//* @route PUT /api/task/:id
//* @access `REGISTERED USER`
export const editTask = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;

    // Update task by body object
    const task = await updateTask(taskId, req.body);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    res.status(201).json({
      success: true,
      message: getSuccessMessage("edit", "task"),
      data: task,
    } as IResponse);
  }
);

//* @desc Delete a task
//* @route DELETE /api/task/:id
//* @access `REGISTERED USER`
export const deleteTask = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;

    // Delete task
    const deletedTask = await deleteTaskById(taskId);

    if (!deletedTask)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!deletedTask.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    res.status(201).json({
      success: true,
      message: getSuccessMessage("delete", "task"),
    } as IResponse);

    await countProjectTasks(deletedTask.project);
  }
);

//* @desc Change a task status
//* @route PUT /api/task/:id/stauts
//* @access `REGISTERED USER`
export const completeTask = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    // validate middleware checks if task exists and returns task data to body
    let task = req.body.validationResults.Task;
    const loggedUserId = req.user._id;

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Change task status to completed
    task = await changeStatus(task, Status.Completed);

    res.status(201).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    } as IResponse);

    await countProjectTasks(task.project);
  }
);
