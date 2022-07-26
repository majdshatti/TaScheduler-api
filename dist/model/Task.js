"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const slugify_1 = __importDefault(require("slugify"));
// Schemas
const _1 = require("./");
// Interfaces
const interfaces_1 = require("./../interfaces");
const taskSchema = new mongoose_1.Schema({
    name: String,
    slug: String,
    description: String,
    status: String,
    image: String,
    startDate: Date,
    completeDate: Date,
    dueDate: Date,
    todos: {
        type: [_1.todoSchema],
    },
    project: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Project",
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    },
    updatedAt: Date,
}, { versionKey: false });
taskSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    this.status = setInitStatus(this.startDate, this.dueDate);
    next();
});
//* @desc Set an initial value for the status of a task
const setInitStatus = function (sDate, eDate) {
    let initStatus = interfaces_1.Status.Active;
    const startDate = new Date(sDate).getTime();
    const dueDate = new Date(eDate).getTime();
    const currentDate = new Date().getTime();
    if (currentDate < startDate)
        initStatus = interfaces_1.Status.Hold;
    if (currentDate > dueDate)
        initStatus = interfaces_1.Status.Overdue;
    return initStatus;
};
const Task = (0, mongoose_1.model)("Task", taskSchema);
exports.default = Task;
