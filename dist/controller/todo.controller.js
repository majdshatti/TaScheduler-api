"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editTodoCheck = exports.editTodoData = exports.removeTodo = exports.addTodo = void 0;
// Middlewares
const middleware_1 = require("../middleware");
// Services
const todo_service_1 = require("../services/todo.service");
const task_service_1 = require("../services/task.service");
// Utils
const utils_1 = require("../utils");
//* @desc Add a todo to a task
//* @route POST /api/task/:id/todo
//* @access `REGISTERED USER`
exports.addTodo = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paragraph = req.body.paragraph;
    const taskId = req.params.id;
    const loggedUserId = req.user._id;
    let task = yield (0, task_service_1.getTaskById)(taskId);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    // Add a todo to task
    task = yield (0, todo_service_1.pushTodo)(task, paragraph);
    return res.status(200).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
//* @desc Remove a todo from a task
//* @route DELETE /api/task/:id/todo/:id
//* @access `REGISTERED USER`
exports.removeTodo = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const todoId = req.params.todoId;
    const loggedUserId = req.user._id;
    let task = yield (0, task_service_1.getTaskById)(taskId);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    // Check if exists and Get todo array index
    const { index, isTodoExist } = (0, utils_1.getTodoIndexById)(task.todos, todoId);
    if (!isTodoExist || index < 0)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "todo"), 404));
    // Remove a todo from a task
    const newTask = yield (0, todo_service_1.pullTodo)(task, index);
    return res.status(200).json({
        success: true,
        data: newTask,
        message: (0, utils_1.getSuccessMessage)("delete", "todo"),
    });
}));
//* @desc Edit a todo
//* @route PUT /api/task/:id/todo/:id
//* @access `REGISTERED USER`
exports.editTodoData = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const todoId = req.params.todoId;
    const paragraph = req.body.paragraph;
    const loggedUserId = req.user._id;
    let task = yield (0, task_service_1.getTaskById)(taskId);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    // Check if exists and Get todo array index
    const { index, isTodoExist } = (0, utils_1.getTodoIndexById)(task.todos, todoId);
    if (!isTodoExist || index < 0)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "todo"), 404));
    // Edit todo
    task = yield (0, todo_service_1.editTodo)(task, index, { paragraph });
    res.status(200).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
//* @desc Check a todo
//* @route PUT /api/task/:id/todo/:id/check
//* @access `REGISTERED USER`
exports.editTodoCheck = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const todoId = req.params.todoId;
    const loggedUserId = req.user._id;
    let task = yield (0, task_service_1.getTaskById)(taskId);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    // Check if exists and Get todo array index
    const { index, isTodoExist } = (0, utils_1.getTodoIndexById)(task.todos, todoId);
    if (!isTodoExist || index < 0)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "todo"), 404));
    // Change isChecked to !isChecked
    const newTask = yield (0, todo_service_1.toggleTodo)(task, index);
    res.status(200).json({
        success: true,
        data: newTask,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
