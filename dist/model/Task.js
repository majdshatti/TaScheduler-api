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
const mongoose_1 = require("mongoose");
// Schemas
const _1 = require("./");
// Interfaces
const interfaces_1 = require("./../interfaces");
// Services
const project_service_1 = require("../services/project.service");
// Utils
const slugify_1 = __importDefault(require("slugify"));
//* Task Schema
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
// Auto set slug, updatedAt and initial status before saving document
taskSchema.pre("save", function (next) {
    this.updatedAt = new Date();
    this.slug = (0, slugify_1.default)(this.name, { lower: true });
    this.status = setInitStatus(this.startDate, this.dueDate);
    next();
});
// After saving, change the project completion counts
taskSchema.post("save", function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, project_service_1.countProjectTasks)(this.project);
    });
});
// Set an initial value for the status of a task
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
