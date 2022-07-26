import { Request, Response, NextFunction } from "express";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import { pushTodo, pullTodo, toggleTodo } from "../services/todo.service";
import { getTaskBySlug } from "../services/task.service";
// Interfaces
import { IResponse, ITask } from "../interfaces";
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

//* @desc Edit a todo
//* @route PUT /api/project/:slug/todo/:id
//* @access private
export const editTodo = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

//* @desc Check a todo
//* @route PUT /api/project/:slug/todo/:id/check
//* @access private
export const editTodoCheck = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskSlug = req.params.slug;
    const todoId = req.params.todoId;

    let task = (await getTaskBySlug(taskSlug)) as ITask;

    if (!task)
      return next(new ErrorResponse(getErrorMessage("exist", "task"), 404));

    // Search if todo if is exist
    let isTodoExist = false;
    let todoIndex: number = -1;

    if (task?.todos && task.todos.length > 0) {
      task.todos.map((todo, index) => {
        if (todo._id.equals(todoId)) {
          isTodoExist = true;
          // Get the index to modify isChecked
          todoIndex = index;
        }
      });
    }

    if (!isTodoExist || todoIndex < 0)
      return next(new ErrorResponse(getErrorMessage("exist", "todo"), 404));

    // Change isChecked to !isChecked
    const newTask = await toggleTodo(task, todoIndex);

    res.status(200).json({
      success: true,
      data: newTask,
      message: getSuccessMessage("edit", "task"),
    } as IResponse);
  }
);
