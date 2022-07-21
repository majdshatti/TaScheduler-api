import { Router } from "express";

// Controllers
import {
  getTasks,
  getSingleTask,
  createTask,
  editTask,
  deleteTask,
} from "../controller/task.controller";
import { removeTodo, addTodo } from "../controller/todo.controller";
// Middlewares
import { taskValidate, validationResults } from "../middleware/";

const router = Router();

//*************************************/
//*********** TODO ROUTES *************/
//*************************************/

router
  .route("/:slug/todo/:todoId")
  .delete(taskValidate("removeTodo"), validationResults(), removeTodo);

router
  .route("/:slug/todo")
  .post(taskValidate("addTodo"), validationResults(), addTodo);

//*************************************/
//*********** TASK ROUTES *************/
//*************************************/

router
  .route("/:slug")
  .get(getSingleTask)
  .put(taskValidate("edit"), validationResults(), editTask)
  .delete(deleteTask);

router
  .route("/")
  .get(getTasks)
  .post(taskValidate("create"), validationResults(), createTask);

export default router;
