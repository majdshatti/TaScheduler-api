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
exports.editTodo = exports.removeTodo = exports.addTodo = void 0;
// Middlewares
const middleware_1 = require("../middleware");
// Services
const todo_service_1 = require("../services/todo.service");
// Utils
const utils_1 = require("../utils");
//* @desc Create a task
//* @route PUT /api/project/:slug/todo
//* @access private
exports.addTodo = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const paragraph = req.body.paragraph;
    const taskSlug = req.params.slug;
    const task = yield (0, todo_service_1.pushTodo)(taskSlug, paragraph);
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    return res.status(200).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
//* @desc Create a task
//* @route PUT /api/project/:slug/todo/:id
//* @access private
exports.removeTodo = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskSlug = req.params.slug;
    const todoId = req.params.todoId;
    const task = yield (0, todo_service_1.pullTodo)(taskSlug, todoId);
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    return res.status(200).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
//* @desc Check a todo
//* @route PUT /api/project/:slug/todo/:id/details
//* @access private
exports.editTodo = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
