"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
// Models
const Task_1 = __importDefault(require("../model/Task"));
const createTask = (data) => {
    try {
        return Task_1.default.create({
            name: data.name,
            description: data.description
        });
    }
    catch (error) {
        const errorObject = {
            success: false,
            message: error.message
        };
        return errorObject;
    }
};
exports.createTask = createTask;
