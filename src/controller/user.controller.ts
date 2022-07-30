import { Request, Response, NextFunction } from "express";

// Middleware
import { asyncHandler } from "../middleware";
// Services
import {
  getUserBySlug,
  updateUser,
  destroyUser,
} from "../services/user.service";
// Utils
import { ErrorResponse, getErrorMessage, getSuccessMessage } from "../utils";
// Interfaces
import {
  IFilterResponse,
  IAuthRequest,
  IUserDocument,
  IUser,
} from "../interfaces";

//* @desc Get all users with the apply of quering and filtering
//* @route GET /api/user
//* @access ADMIN
export const getUsers = asyncHandler(
  async (req: Request, res: IFilterResponse, next: NextFunction) => {
    res.status(200).send(res.filter);
  }
);

//* @desc Get a single user by slug
//* @route GET /api/user/:slug
//* @access ADMIN
export const getSingleUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userSlug = req.params.slug;

    const user = await getUserBySlug(userSlug, "project");

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "user"), 404));

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

//* @desc Get a single user by slug
//* @route GET /api/user/:slug
//* @access ADMIN, REGISTRED USER
export const getUserProfile = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    const userSlug = req.user.slug ?? "";

    const user = await getUserBySlug(userSlug, "project");

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "user"), 404));

    res.status(200).json({
      success: true,
      data: user,
    });
  }
);

//* @desc Edit user details
//* @route PUT /api/user/:slug
//* @access private
export const editUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userSlug = req.params.slug;
    const userBody = req.body;

    let user = await getUserBySlug(userSlug, "project");

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "user"), 404));

    user = await updateUser(userSlug, userBody);

    res.status(200).json({
      success: true,
      data: user,
      message: getSuccessMessage("edit", "user"),
    });
  }
);

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {}
);

//* @desc Delete a user
//* @route DELETE /api/user/:slug
//* @access private
export const deleteUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userSlug = req.params.slug;

    let user = await getUserBySlug(userSlug);

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "user"), 404));

    await destroyUser(user);

    res.status(200).json({
      success: true,
      message: getSuccessMessage("delete", "user"),
    });
  }
);
