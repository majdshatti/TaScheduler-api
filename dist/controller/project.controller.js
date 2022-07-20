"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.editProject = exports.saveProject = exports.getProjectBySlug = exports.getProjects = void 0;
// Middleware
const middleware_1 = require("../middleware");
// Services
const project_service_1 = require("../services/project.service");
// Utils
const utils_1 = require("../utils");
//* @desc Get all projects
//* @route GET /api/project
//* @access private
exports.getProjects = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        success: true,
        data: yield (0, project_service_1.getAllProjects)(),
    });
}));
//* @desc Get a single project by slug
//* @route GET /api/project/:slug
//* @access private
exports.getProjectBySlug = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const project = yield (0, project_service_1.getSingleProject)({ slug });
    if (!project)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", slug), 404));
    return res.status(200).json({
        success: true,
        data: project,
    });
}));
//* @desc Create a project
//* @route POST /api/project
//* @access private
exports.saveProject = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const project = yield (0, project_service_1.createProject)(req.body);
    res.status(201).json({
        success: true,
        data: project,
        message: (0, utils_1.getSuccessMessage)("create", "project"),
    });
}));
//* @desc Edit project details
//* @route PUT /api/project/:slug
//* @access private
exports.editProject = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const project = yield (0, project_service_1.updateProject)(slug, req.body);
    if (!project)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "project"), 404));
    return res.status(200).json({
        success: true,
        data: project,
        message: (0, utils_1.getSuccessMessage)("edit", "project"),
    });
}));
//* @desc Delete a project
//* @route DELETE /api/project/:slug
//* @access private
exports.deleteProject = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = req.params.slug;
    const isDeleted = yield (0, project_service_1.deleteProjectBySlug)(slug);
    if (!isDeleted)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "project"), 404));
    res.status(200).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("delete", "project"),
    });
}));
