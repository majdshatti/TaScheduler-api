"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Task Controller
const task_controller_1 = require("../controller/task.controller");
// .Todos Controller
const todo_controller_1 = require("../controller/todo.controller");
// Middlewares
const middleware_1 = require("../middleware/");
const router = (0, express_1.Router)();
//*************************************/
//*********** TODO ROUTES *************/
//*************************************/
router
    .route("/:id/todo/:todoId/check")
    .put((0, middleware_1.todoValidate)("check"), (0, middleware_1.validationResults)(), todo_controller_1.editTodoCheck);
router
    .route("/:id/todo/:todoId")
    .put((0, middleware_1.todoValidate)("edit"), (0, middleware_1.validationResults)(), todo_controller_1.editTodoData)
    .delete((0, middleware_1.todoValidate)("delete"), (0, middleware_1.validationResults)(), todo_controller_1.removeTodo);
router
    .route("/:id/todo")
    .post((0, middleware_1.todoValidate)("create"), (0, middleware_1.validationResults)(), todo_controller_1.addTodo);
//*************************************/
//*********** TASK ROUTES *************/
//*************************************/
router
    .route("/:id/complete")
    .put((0, middleware_1.taskValidate)("complete"), (0, middleware_1.validationResults)(), task_controller_1.completeTask);
router
    .route("/:id")
    .get(task_controller_1.getSingleTask)
    .put((0, middleware_1.taskValidate)("edit"), (0, middleware_1.validationResults)(), task_controller_1.editTask)
    .delete((0, middleware_1.taskValidate)("delete"), (0, middleware_1.validationResults)(), task_controller_1.deleteTask);
router
    .route("/")
    .get((0, middleware_1.filter)("Task", "user project"), task_controller_1.getTasks)
    .post((0, middleware_1.taskValidate)("create"), (0, middleware_1.validationResults)(), task_controller_1.createTask);
exports.default = router;
