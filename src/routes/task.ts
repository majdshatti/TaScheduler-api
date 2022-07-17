import { Router } from "express";

// Controller
import { getTasks, addTask } from "../controller/task.controller";

// Middlewares
import validate from "../middleware/validationResults";
import taskValidate from "../middleware/validators/task.validate";

const router = Router();

router.route("/").get(getTasks).post(taskValidate(), validate(), addTask);

export default router;
