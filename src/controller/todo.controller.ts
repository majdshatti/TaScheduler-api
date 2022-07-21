import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import { pushTodo, pullTodo } from "../services/todo.service";
// Interfaces
import { IResponse, ITodo } from "../interfaces";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";

//* @desc Create a task
//* @route PUT /api/project/:slug/todo
//* @access private
export const addTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const paragraph: string = req.body.paragraph;
    const taskSlug = req.params.slug;

    const task = await pushTodo(taskSlug, paragraph);

    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    return res.status(200).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    });
  }
);

//* @desc Create a task
//* @route PUT /api/project/:slug/todo/:id
//* @access private
export const removeTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskSlug: string = req.params.slug;
    const todoId: string = req.params.todoId;

    const task = await pullTodo(taskSlug, todoId);

    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    return res.status(200).json({
      success: true,
      data: task,
      message: getSuccessMessage("edit", "task"),
    });
  }
);

//* @desc Check a todo
//* @route PUT /api/project/:slug/todo/:id/details
//* @access private
export const editTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);
