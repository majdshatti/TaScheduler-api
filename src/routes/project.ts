import { Router } from "express";
// Controller
import {
  getProjects,
  getSingleProject,
  saveProject,
  editProject,
  deleteProject,
} from "../controller/project.controller";
// Middlewares
import { projectValidate, validationResults } from "../middleware";
const router = Router();

router
  .route("/")
  .get(getProjects)
  .post(projectValidate("edit"), validationResults(), saveProject);

router
  .route("/:slug")
  .get(getSingleProject)
  .put(editProject)
  .delete(deleteProject);

export default router;
