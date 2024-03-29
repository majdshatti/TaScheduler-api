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
const colors_1 = __importDefault(require("colors"));
// Services
const task_service_1 = require("../services/task.service");
// Interfaces
const interfaces_1 = require("../interfaces");
// Utils
const utils_1 = require("../utils");
//* @desc: Check task status and change them
const checkTaskStatus = () => () => __awaiter(void 0, void 0, void 0, function* () {
    // Get all tasks
    let tasks = yield (0, task_service_1.getAllTasks)();
    // Loop over all tasks
    for (const task of tasks) {
        // Get the user of a task to be notified in case of an event
        const user = (0, utils_1.getPopulatedObject)(task.user);
        // Gather dates
        const startDate = new Date(task.startDate).getTime();
        const dueDate = new Date(task.dueDate).getTime();
        const currentDate = new Date().getTime();
        // Task hold status
        if (currentDate < startDate && task.status != interfaces_1.Status.Hold) {
            logStatusChange(task._id.toString(), task.status, interfaces_1.Status.Active);
            // Set status
            task.status = interfaces_1.Status.Hold;
        }
        // Task overdue status
        if (currentDate > dueDate &&
            task.status != interfaces_1.Status.Overdue &&
            task.status != interfaces_1.Status.Completed) {
            logStatusChange(task._id.toString(), task.status, interfaces_1.Status.Overdue);
            // Set status
            task.status = interfaces_1.Status.Overdue;
            // Notify a user that task status has changed
            const isSent = (0, utils_1.sendMessage)(user._id, "notification", {
                message: "Overdue alart!",
            });
        }
        // Task active status
        if (currentDate > startDate &&
            currentDate < dueDate &&
            task.status != interfaces_1.Status.Active) {
            logStatusChange(task._id.toString(), task.status, interfaces_1.Status.Active);
            // Set stauts
            task.status = interfaces_1.Status.Active;
        }
        // Update task status
        yield task.updateOne({ status: task.status });
    }
    console.log(colors_1.default.green.italic("Task status Scheduler has successfully ran at time: " + new Date()));
});
// Log status changes
const logStatusChange = (taskId, oldStatus, newStatus) => {
    console.log(colors_1.default.magenta(`${taskId} status changed from ${oldStatus} to ${newStatus}`));
};
exports.default = checkTaskStatus;
