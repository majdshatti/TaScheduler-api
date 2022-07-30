import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "./";
import { ErrorResponse, getErrorMessage, verifyToken } from "../utils";
import { IAuthRequest } from "../interfaces";

export const authenticate = asyncHandler(
  async (req: IAuthRequest, res: Response, next: NextFunction) => {
    let token: string = "";

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

    try {
      const user = await verifyToken(token);

      if (!user)
        return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

      req.user = user;

      next();
    } catch (error) {
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));
    }
  }
);
