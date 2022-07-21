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
exports.addTask = exports.getTasks = void 0;
// Middlewares
const middleware_1 = require("../middleware");
// Services
const task_service_1 = require("../services/task.service");
// Utils
const utils_1 = require("../utils");
exports.getTasks = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, task_service_1.getAllTasks)();
    res.status(200).json({
        success: true,
        data: tasks,
    });
}));
exports.addTask = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get body params
    const bodyObject = req.body;
    let status = "Hold";
    const startDate = new Date(req.body.startDate).getTime();
    const currentDate = new Date().getTime();
    if (startDate <= currentDate)
        status = "Active";
    console.log(bodyObject);
    // Creating task
    const task = yield (0, task_service_1.createTask)(bodyObject);
    return res.status(201).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("create", "task"),
        data: task,
    });
}));
