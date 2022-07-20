import { Request, Response, NextFunction } from "express";
// Environment Settings
import { getCookieOptions } from "../config/settings";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import { findUserByCreds, createUser } from "../services/auth.service";
// Interfaces
import { IResponse, IUser } from "../interfaces";
// Utils
import { ErrorResponse, getErrorMessage } from "../utils";

//* @desc: Login user
//* @route: POST /api/auth/login
//* @access: public
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    const user = await findUserByCreds(username, password);

    if (!user)
      return next(
        new ErrorResponse(
          getErrorMessage("credentials", "username/password"),
          400
        )
      );

    const token = user.getSignedJwtToken();

    res.status(200).cookie("token", token, getCookieOptions()).json({
      success: true,
      token,
    });
  }
);

//* @desc: Register user
//* @route: POST /api/auth/register
//* @access: public
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userBody = req.body as IUser;

    // Save user
    const user = await createUser(userBody);

    // Generate a token
    const token = user.getSignedJwtToken();

    res.status(201).json({
      success: true,
      token: token,
    } as IResponse);
  }
);
