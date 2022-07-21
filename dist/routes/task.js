"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controllers
const task_controller_1 = require("../controller/task.controller");
const todo_controller_1 = require("../controller/todo.controller");
// Middlewares
const middleware_1 = require("../middleware/");
const router = (0, express_1.Router)();
//*************************************/
//*********** TODO ROUTES *************/
//*************************************/
router
    .route("/:slug/todo/:todoId")
    .delete((0, middleware_1.taskValidate)("removeTodo"), (0, middleware_1.validationResults)(), todo_controller_1.removeTodo);
router
    .route("/:slug/todo")
    .post((0, middleware_1.taskValidate)("addTodo"), (0, middleware_1.validationResults)(), todo_controller_1.addTodo);
//*************************************/
//*********** TASK ROUTES *************/
//*************************************/
router
    .route("/:slug")
    .get(task_controller_1.getSingleTask)
    .put((0, middleware_1.taskValidate)("edit"), (0, middleware_1.validationResults)(), task_controller_1.editTask)
    .delete(task_controller_1.deleteTask);
router
    .route("/")
    .get(task_controller_1.getTasks)
    .post((0, middleware_1.taskValidate)("create"), (0, middleware_1.validationResults)(), task_controller_1.createTask);
exports.default = router;
