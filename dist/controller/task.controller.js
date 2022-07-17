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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.getTasks = void 0;
// Middlewares
const async_1 = __importDefault(require("../middleware/async"));
// Services
const task_service_1 = require("../services/task.service");
exports.getTasks = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield (0, task_service_1.getAllTasks)();
    res.status(200).json({
        success: true,
        data: tasks,
    });
}));
exports.addTask = (0, async_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Get body params
    const { name, description, startDate, dueDate } = req.body;
    const taskBody = {
        name,
        description,
        startDate,
        dueDate,
        status: "Hold",
    };
    // Creating task
    const task = yield (0, task_service_1.createTask)(taskBody);
    return res.status(201).json({
        success: true,
        message: "Task added.",
        data: task,
    });
}));
