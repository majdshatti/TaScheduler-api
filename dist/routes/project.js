"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Controller
const project_controller_1 = require("../controller/project.controller");
// Middlewares
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
router
    .route("/")
    .get((0, middleware_1.filter)("Project"), project_controller_1.getProjects)
    .post((0, middleware_1.projectValidate)("create"), (0, middleware_1.validationResults)(), project_controller_1.saveProject);
router
    .route("/:slug")
    .get(project_controller_1.getSingleProject)
    .put((0, middleware_1.projectValidate)("edit"), (0, middleware_1.validationResults)(), project_controller_1.editProject)
    .delete(project_controller_1.deleteProject);
exports.default = router;
