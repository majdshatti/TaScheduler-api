"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const task_controller_1 = require("../controller/task.controller");
// Middlewares
const middleware_1 = require("../middleware/");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(task_controller_1.getTasks)
    .post((0, middleware_1.taskValidate)("create"), (0, middleware_1.validationResults)(), task_controller_1.addTask);
exports.default = router;
