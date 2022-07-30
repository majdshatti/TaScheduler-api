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
exports.completeTask = exports.deleteTask = exports.editTask = exports.createTask = exports.getSingleTask = exports.getTasks = void 0;
// Middlewares
const middleware_1 = require("../middleware");
// Services
const task_service_1 = require("../services/task.service");
// Interfaces
const interfaces_1 = require("../interfaces");
// Utils
const utils_1 = require("../utils");
//* @desc Get all tasks
//* @route GET /api/task
//* @access private
exports.getTasks = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(res.filter);
}));
//* @desc Get a single task by slug
//* @route GET /api/task/:slug
//* @access private
exports.getSingleTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const task = yield (0, task_service_1.getTaskBySlug)(slug);
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    res.status(200).json({
        success: true,
        data: task,
    });
}));
//* @desc Create a task
//* @route POST /api/task
//* @access private
exports.createTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get body params
    const bodyObject = req.body;
    // Creating task
    const task = yield (0, task_service_1.addTask)(bodyObject);
    return res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("create", "task"),
        data: task,
    });
}));
//* @desc Create a task
//* @route POST /api/task
//* @access private
exports.editTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    // Get body params
    const bodyObject = req.body;
    // Update task
    const task = yield (0, task_service_1.updateTask)(slug, bodyObject);
    return res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
        data: task,
    });
}));
//* @desc Delete a task
//* @route DELETE /api/task/:slug
//* @access private
exports.deleteTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    // delete task
    const isDeleted = yield (0, task_service_1.deleteTaskBySlug)(slug);
    if (!isDeleted)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    return res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("delete", "task"),
    });
}));
//* @desc Change a task status
//* @route PUT /api/task/:slug/stauts
//* @access private
exports.completeTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let task = req.body.validationResults.Task;
    task = yield (0, task_service_1.changeStatus)(task, interfaces_1.Status.Completed);
    return res.status(201).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
}));
