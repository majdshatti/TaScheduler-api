import { Request, Response, NextFunction } from "express";

// Middleware
import { asyncHandler } from "../middleware";
// Services
import {
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProjectBySlug,
} from "../services/project.service";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";
// Interfaces
import { IAuthRequest, IFilterResponse } from "../interfaces";

//* @desc Get all projects
//* @route GET /api/project
//* @access `REGISTERED USER`
export const getProjects = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.status(200).send(res.filter);
  }
);

//* @desc Get a single project by slug
//* @route GET /api/project/:slug
//* @access `REGISTERED USER`
export const getSingleProject = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const loggedUserId = req.user._id;

    // Find project
    const project = await getProjectBySlug({ slug });

    // Check if project exist
    if (!project)
      return next(new ErrorResponse(getErrorMessage("exist", slug), 404));

    return res.status(200).json({
      success: true,
      data: project,
    });
  }
);

//* @desc Create a project
//* @route POST /api/project
//* @access `REGISTERED USER`
export const saveProject = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const loggedUserId = req.user._id;

    // Assign logged in user id to the project
    req.body.user = loggedUserId;

    // Create a project
    const project = await createProject(req.body);

    res.status(201).json({
      success: true,
      data: project,
      message: getSuccessMessage("create", "project"),
    });
  }
);

//* @desc Edit project details
//* @route PUT /api/project/:slug
//* @access `REGISTERED USER`
export const editProject = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const loggedUserId = req.user._id;

    // Find project
    const project = await getProjectBySlug({ slug });

    // Check if project exist
    if (!project)
      return next(new ErrorResponse(getErrorMessage("exist", slug), 404));

    // Check if task belongs to the logged user
    if (!project.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    // Update Project
    const newProject = await updateProject(slug, req.body);

    return res.status(200).json({
      success: true,
      data: newProject,
      message: getSuccessMessage("edit", "project"),
    });
  }
);

//* @desc Delete a project
//* @route DELETE /api/project/:slug
//* @access `REGISTERED USER`
export const deleteProject = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const slug = req.params.slug;
    const loggedUserId = req.user._id;

    // Find project
    const project = await getProjectBySlug({ slug });

    // Check if project exist
    if (!project)
      return next(new ErrorResponse(getErrorMessage("exist", slug), 404));

    // Check if task belongs to the logged user
    if (!project.user.equals(loggedUserId))
      return next(new ErrorResponse(getErrorMessage("auth", "task"), 401));

    const isDeleted = await deleteProjectBySlug(slug);

    if (!isDeleted)
      return next(new ErrorResponse(getErrorMessage("exist", "project"), 404));

    res.status(200).json({
      success: true,
      message: getSuccessMessage("delete", "project"),
    });
  }
);
