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
exports.toggleTodo = exports.pullTodo = exports.pushTodo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Models
const model_1 = require("../model");
//* @desc: Add todo to task
const pushTodo = (taskSlug, paragraph) => __awaiter(void 0, void 0, void 0, function* () {
    const todo = {
        _id: new mongoose_1.default.Types.ObjectId(),
        paragraph,
        isChecked: false,
    };
    try {
        const task = yield model_1.Task.findOneAndUpdate({ slug: taskSlug }, { $push: { todos: todo } }, { new: true });
        if (!task)
            return false;
        return task;
    }
    catch (err) {
        return false;
    }
});
exports.pushTodo = pushTodo;
//* @desc: Remove Todo from task
const pullTodo = (taskSlug, todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield model_1.Task.findOneAndUpdate({ slug: taskSlug }, { $pull: { todos: { _id: todoId } } }, { new: true });
        if (!task)
            return false;
        return task;
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.pullTodo = pullTodo;
//* @desc: Edit todo
const toggleTodo = (taskSlug, todoId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let task = yield model_1.Task.findOne({ slug: taskSlug });
        if (!task)
            return false;
        if (task === null || task === void 0 ? void 0 : task.todos) {
            for (const todo of task.todos) {
                if (todo._id.equals(todoId)) {
                    todo.isChecked = !todo.isChecked;
                }
            }
        }
        return yield task.save();
    }
    catch (err) {
        console.log(err);
        return false;
    }
});
exports.toggleTodo = toggleTodo;
