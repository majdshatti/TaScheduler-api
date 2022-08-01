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
const project_service_1 = require("../services/project.service");
// Interfaces
const interfaces_1 = require("../interfaces");
// Utils
const utils_1 = require("../utils");
//* @desc Get all tasks that belongs to logged in user
//* @route GET /api/task
//* @access `REGISTERED USER`
exports.getTasks = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Return results of filter middleware
    res.status(200).send(res.filter);
}));
//* @desc Get a single task by id
//* @route GET /api/task/:id
//* @access `REGISTERED USER`
exports.getSingleTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;
    // Get task
    const task = yield (0, task_service_1.getTaskById)(taskId);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    res.status(200).json({
        success: true,
        data: task,
    });
}));
//* @desc Create a task
//* @route POST /api/task
//* @access `REGISTERED USER`
exports.createTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Assign logged in user id to body to be attached with the created task
    req.body.user = req.user._id;
    // Creating task
    const task = yield (0, task_service_1.addTask)(req.body);
    res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("create", "task"),
        data: task,
    });
}));
//* @desc Edit a task by Id
//* @route PUT /api/task/:id
//* @access `REGISTERED USER`
exports.editTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;
    // Update task by body object
    const task = yield (0, task_service_1.updateTask)(taskId, req.body);
    // Check if task exists
    if (!task)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
        data: task,
    });
}));
//* @desc Delete a task
//* @route DELETE /api/task/:id
//* @access `REGISTERED USER`
exports.deleteTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const taskId = req.params.id;
    const loggedUserId = req.user._id;
    // Delete task
    const deletedTask = yield (0, task_service_1.deleteTaskById)(taskId);
    if (!deletedTask)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "task"), 404));
    // Check if task belongs to the logged user
    if (!deletedTask.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("delete", "task"),
    });
    yield (0, project_service_1.countProjectTasks)(deletedTask.project);
}));
//* @desc Change a task status
//* @route PUT /api/task/:id/stauts
//* @access `REGISTERED USER`
exports.completeTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // validate middleware checks if task exists and returns task data to body
    let task = req.body.validationResults.Task;
    const loggedUserId = req.user._id;
    // Check if task belongs to the logged user
    if (!task.user.equals(loggedUserId))
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "task"), 401));
    // Change task status to completed
    task = yield (0, task_service_1.changeStatus)(task, interfaces_1.Status.Completed);
    res.status(201).json({
        success: true,
        data: task,
        message: (0, utils_1.getSuccessMessage)("edit", "task"),
    });
    yield (0, project_service_1.countProjectTasks)(task.project);
}));
