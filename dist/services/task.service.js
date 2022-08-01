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
exports.changeStatus = exports.deleteTaskById = exports.updateTask = exports.addTask = exports.getTaskById = exports.getAllTasks = void 0;
const slugify_1 = __importDefault(require("slugify"));
// Models
const model_1 = require("../model");
//* @desc: Get all tasks service
const getAllTasks = () => {
    return model_1.Task.find().populate("user");
};
exports.getAllTasks = getAllTasks;
//* @desc: Get single task service
const getTaskById = (id) => {
    return model_1.Task.findOne({ _id: id }).populate("user project");
};
exports.getTaskById = getTaskById;
//* @desc: Create a task service
const addTask = (data) => {
    return model_1.Task.create(data);
};
exports.addTask = addTask;
//* @desc: Update a task service
const updateTask = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, description } = body;
    const updateObject = {
        name: name !== null && name !== void 0 ? name : undefined,
        slug: name ? (0, slugify_1.default)(name, { lower: true }) : undefined,
        description: description !== null && description !== void 0 ? description : undefined,
        updatedAt: new Date(),
    };
    return model_1.Task.findOneAndUpdate({ _id: id }, updateObject, {
        new: true,
    });
});
exports.updateTask = updateTask;
//* @desc: Delete a task service
const deleteTaskById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return model_1.Task.findOneAndRemove({ _id: id });
});
exports.deleteTaskById = deleteTaskById;
//* @desc: Update the status of a task
const changeStatus = (task, status) => __awaiter(void 0, void 0, void 0, function* () {
    return model_1.Task.findOneAndUpdate({ _id: task._id }, { status: status, updatedAt: new Date() }, { new: true });
});
exports.changeStatus = changeStatus;
