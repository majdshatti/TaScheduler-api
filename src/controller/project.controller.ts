import { Request, Response, NextFunction } from "express";

// Middleware
import { asyncHandler } from "../middleware";
// Services
import {
  getAllProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProjectBySlug,
} from "../services/project.service";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";
// Interfaces
import { IFilterResponse } from "../interfaces";

//* @desc Get all projects
//* @route GET /api/project
//* @access private
export const getProjects = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.status(200).send(res.filter);
  }
);

//* @desc Get a single project by slug
//* @route GET /api/project/:slug
//* @access private
export const getSingleProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const project = await getProjectBySlug({ slug });

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
//* @access private
export const saveProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
//* @access private
export const editProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const project = await updateProject(slug, req.body);

    if (!project)
      return next(new ErrorResponse(getErrorMessage("exist", "project"), 404));

    return res.status(200).json({
      success: true,
      data: project,
      message: getSuccessMessage("edit", "project"),
    });
  }
);

//* @desc Delete a project
//* @route DELETE /api/project/:slug
//* @access private
export const deleteProject = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const slug = req.params.slug;

    const isDeleted = await deleteProjectBySlug(slug);

    if (!isDeleted)
      return next(new ErrorResponse(getErrorMessage("exist", "project"), 404));

    res.status(200).json({
      success: true,
      message: getSuccessMessage("delete", "project"),
    });
  }
);
