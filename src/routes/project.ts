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
import { projectValidate, validationResults, filter } from "../middleware";
const router = Router();

router
  .route("/")
  .get(filter("Project"), getProjects)
  .post(projectValidate("edit"), validationResults(), saveProject);

router
  .route("/:slug")
  .get(getSingleProject)
  .put(editProject)
  .delete(deleteProject);

export default router;
