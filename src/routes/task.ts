import { Router } from "express";

// Controller
import { getTasks, addTask } from "../controller/task.controller";

// Middlewares
import { taskValidate, validationResults } from "../middleware/";

const router = Router();

router
  .route("/")
  .get(getTasks)
  .post(taskValidate("create"), validationResults(), addTask);

export default router;
