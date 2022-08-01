import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import {
  pushTodo,
  pullTodo,
  toggleTodo,
  editTodo,
} from "../services/todo.service";
import { getTaskById } from "../services/task.service";
// Interfaces
import { IResponse, ITaskDocument, ITodo, IAuthRequest } from "../interfaces";
// Utils
import {
  ErrorResponse,
  getErrorMessage,
  getSuccessMessage,
  getTodoIndexById,
} from "../utils";

//* @desc Add a todo to a task
//* @route POST /api/task/:id/todo
//* @access `REGISTERED USER`
export const addTodo = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const paragraph: string = req.body.paragraph;
    const taskId = req.params.id;
    const loggedUserId = req.user._id;

    let task = await getTaskById(taskId);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Add a todo to task
    task = await pushTodo(task, paragraph);

    return res.status(200).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    });
  }
);

//* @desc Remove a todo from a task
//* @route DELETE /api/task/:id/todo/:id
//* @access `REGISTERED USER`
export const removeTodo = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId: string = req.params.id;
    const todoId: string = req.params.todoId;
    const loggedUserId = req.user._id;

    let task = await getTaskById(taskId);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Check if exists and Get todo array index
    const { index, isTodoExist } = getTodoIndexById(task.todos, todoId);

    if (!isTodoExist || index < 0)
      return next(new ErrorResponse(getErrorMessage("exist", "todo"), 404));

    // Remove a todo from a task
    const newTask = await pullTodo(task, index);

    return res.status(200).json({
      success: true,
      data: newTask,
      message: getSuccessMessage("delete", "todo"),
    });
  }
);

//* @desc Edit a todo
//* @route PUT /api/task/:id/todo/:id
//* @access `REGISTERED USER`
export const editTodoData = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const todoId = req.params.todoId;
    const paragraph = req.body.paragraph as string;
    const loggedUserId = req.user._id;

    let task = await getTaskById(taskId);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Check if exists and Get todo array index
    const { index, isTodoExist } = getTodoIndexById(task.todos, todoId);

    if (!isTodoExist || index < 0)
      return next(new ErrorResponse(getErrorMessage("exist", "todo"), 404));

    // Edit todo
    task = await editTodo(task, index, { paragraph } as ITodo);

    res.status(200).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    } as IResponse);
  }
);

//* @desc Check a todo
//* @route PUT /api/task/:id/todo/:id/check
//* @access private
export const editTodoCheck = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const taskId = req.params.id;
    const todoId = req.params.todoId;
    const loggedUserId = req.user._id;

    let task = await getTaskById(taskId);

    // Check if task exists
    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Check if exists and Get todo array index
    const { index, isTodoExist } = getTodoIndexById(task.todos, todoId);

    if (!isTodoExist || index < 0)
      return next(new ErrorResponse(getErrorMessage("exist", "todo"), 404));

    // Change isChecked to !isChecked
    const newTask = await toggleTodo(task, index);

    res.status(200).json({
      success: true,
      data: newTask,
      message: getSuccessMessage("edit", "task"),
    } as IResponse);
  }
);
