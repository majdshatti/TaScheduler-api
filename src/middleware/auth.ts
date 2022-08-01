import { Response, NextFunction } from "express";
import { asyncHandler } from "./";
import { ErrorResponse, getErrorMessage, verifyToken } from "../utils";
import { IAuthRequest } from "../interfaces";
import { getUserById } from "../services/user.service";

export const authenticate = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    let token: string = "";

    // Check for a bearer token is sent form the client
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

    try {
      // Get a user id from token
      const userId = await verifyToken(token);

      // Check if user id is vailed
      if (!userId)
        return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

      // Get user by id
      const user = await getUserById(userId);

      // Check if user exist
      if (!user)
        return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

      req.user = user;

      next();
    } catch (error) {
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));
    }
  }
);
