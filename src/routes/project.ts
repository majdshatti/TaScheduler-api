import { Router } from "express";
// Controller
import {
  getProjects,
  getProjectBySlug,
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
  .get(getProjectBySlug)
  .put(editProject)
  .delete(deleteProject);

export default router;
