"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = exports.projectRouter = exports.authRouter = exports.taskRouter = void 0;
const task_1 = __importDefault(require("./task"));
exports.taskRouter = task_1.default;
const auth_1 = __importDefault(require("./auth"));
exports.authRouter = auth_1.default;
const project_1 = __importDefault(require("./project"));
exports.projectRouter = project_1.default;
const user_1 = __importDefault(require("./user"));
exports.userRouter = user_1.default;
