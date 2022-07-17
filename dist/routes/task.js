"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const task_controller_1 = require("../controller/task.controller");
// Middlewares
const validationResults_1 = __importDefault(require("../middleware/validationResults"));
const task_validate_1 = __importDefault(require("../middleware/validators/task.validate"));
const router = (0, express_1.Router)();
router.route("/").get(task_controller_1.getTasks).post((0, task_validate_1.default)(), (0, validationResults_1.default)(), task_controller_1.addTask);
exports.default = router;
