"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = exports.getAllTasks = void 0;
// Models
const Task_1 = __importDefault(require("../model/Task"));
const getAllTasks = () => {
    return Task_1.default.find();
};
exports.getAllTasks = getAllTasks;
const createTask = (data) => {
    return Task_1.default.create({
        name: data.name,
        description: data.description,
    });
};
exports.createTask = createTask;
