import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
// Environment Settings
import { getCookieOptions } from "../config/settings";
// Middlewares
import { asyncHandler } from "../middleware";
// Services
import { findUserByCreds, createUser } from "../services/auth.service";
import { getUserByCondition } from "../services/user.service";
// Models
import { User } from "../model/";
// Interfaces
import { IResponse, IUser } from "../interfaces";
// Utils
import {
  ErrorResponse,
  getErrorMessage,
  getSuccessMessage,
  sendEmail,
} from "../utils";

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

export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    const user = await getUserByCondition({ email });

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "email"), 404));

    const resetToken = user.getResetPasswordToken();

    await user.save();

    try {
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        template: "resetPassword",
        value: `${req.protocol}://localhost:3000/reset/${resetToken}`,
      });
    } catch (error) {
      console.log(error);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(
        new ErrorResponse(getErrorMessage("operation", "email"), 500)
      );
    }

    res.status(200).json({
      success: true,
      message: getSuccessMessage("emailSent", "user"),
    });
  }
);

export const resetPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const password = req.body.password;

    // Get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorResponse(getErrorMessage("invalidToken", "token"), 400)
      );
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: getSuccessMessage("resetPass", "email"),
    });
  }
);
