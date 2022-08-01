import { Router } from "express";

// Task Controller
import {
  getTasks,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
  completeTask,
} from "../controller/task.controller";
// .Todos Controller
import {
  removeTodo,
  addTodo,
  editTodoData,
  editTodoCheck,
} from "../controller/todo.controller";
// Middlewares
import {
  taskValidate,
  validationResults,
  todoValidate,
  filter,
} from "../middleware/";

const router = Router();

//*************************************/
//*********** TODO ROUTES *************/
//*************************************/

router
  .route("/:id/todo/:todoId/check")
  .put(todoValidate("check"), validationResults(), editTodoCheck);

router
  .route("/:id/todo/:todoId")
  .put(todoValidate("edit"), validationResults(), editTodoData)
  .delete(todoValidate("delete"), validationResults(), removeTodo);

router
  .route("/:id/todo")
  .post(todoValidate("create"), validationResults(), addTodo);

//*************************************/
//*********** TASK ROUTES *************/
//*************************************/

router
  .route("/:id/complete")
  .put(taskValidate("complete"), validationResults(), completeTask);

router
  .route("/:id")
  .get(getSingleTask)
  .put(taskValidate("edit"), validationResults(), editTask)
  .delete(taskValidate("delete"), validationResults(), deleteTask);

router
  .route("/")
  .get(filter("Task", "user project"), getTasks)
  .post(taskValidate("create"), validationResults(), createTask);

export default router;
