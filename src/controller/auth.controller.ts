import { Request, Response, NextFunction } from "express";
import crypto from "crypto";
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
//* @access: `Public`
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    // Get user by email and password
    const user = await findUserByCreds(username, password);

    if (!user)
      return next(
        new ErrorResponse(
          getErrorMessage("credentials", "username/password"),
          400
        )
      );

    // Get a vaild token
    const token = user.getSignedJwtToken();

    res.status(200).json({
      success: true,
      token,
    });
  }
);

//* @desc: Register user
//* @route: POST /api/auth/register
//* @access: `Public`
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userBody = req.body as IUser;

    // Save user
    const user = await createUser(userBody);

    res.status(201).json({
      success: true,
    } as IResponse);
  }
);

//* @desc: Make a reset password request
//* @route: POST /api/auth/forgotpassword
//* @access: `PUBLIC`
export const forgotPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;

    // Get user by email
    const user = await getUserByCondition({ email });

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "email"), 404));

    // Hashs token and return unhashed token for the user
    const resetToken = user.getResetPasswordToken();

    // Save hashed token
    await user.save();

    try {
      // Send an email with a reset like to the user
      await sendEmail({
        email: user.email,
        subject: "Password reset token",
        template: "resetPassword",
        value: `${req.protocol}://localhost:3000/reset/${resetToken}`,
      });
    } catch (error) {
      console.log(error);

      // if failed to send an email
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

    // Hash the token sent from the user
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // find by the hashed token
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    // if failed to get results then token is not valid
    if (!user) {
      return next(
        new ErrorResponse(getErrorMessage("invalidToken", "token"), 400)
      );
    }

    // Set new password
    user.password = password;

    // Unset reset password fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: getSuccessMessage("resetPass", "email"),
    });
  }
);
