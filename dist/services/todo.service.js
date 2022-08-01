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
exports.editTodo = exports.toggleTodo = exports.pullTodo = exports.pushTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Models
const model_1 = require("../model");
//* @desc: Add todo to task
const pushTodo = (task, paragraph) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = {
        _id: new mongoose_1.default.Types.ObjectId(),
        paragraph,
        isChecked: false,
    };
    const newTask = yield model_1.Task.findOneAndUpdate({ id: task._id }, { $push: { todos: todo } }, { new: true });
    return newTask;
});
exports.pushTodo = pushTodo;
//* @desc: Remove Todo from task
const pullTodo = (task, todoIndex) => __awaiter(void 0, void 0, void 0, function* () {
    task.todos.splice(todoIndex, 1);
    task.markModified("todos");
    return task.save();
});
exports.pullTodo = pullTodo;
//* @desc: Edit todo isChecked
const toggleTodo = (task, todoIndex) => __awaiter(void 0, void 0, void 0, function* () {
    task.todos[todoIndex].isChecked = !task.todos[todoIndex].isChecked;
    task.markModified("todos");
    return task.save();
});
exports.toggleTodo = toggleTodo;
//* @desc: Edit todo
const editTodo = (task, todoIndex, data) => __awaiter(void 0, void 0, void 0, function* () {
    task.todos[todoIndex].paragraph = data.paragraph;
    return model_1.Task.findOneAndUpdate(task._id, task, { new: true });
});
exports.editTodo = editTodo;
