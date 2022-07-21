"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoSchema = exports.Todo = void 0;
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    paragraph: String,
    isChecked: Boolean,
}, { versionKey: false });
exports.todoSchema = todoSchema;
const Todo = (0, mongoose_1.model)("Todo", todoSchema);
exports.Todo = Todo;
