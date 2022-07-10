import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse";
import IResponse from "../interfaces/response.interface";
import colors from "colors";

const error = (
  err: ErrorResponse,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(
    colors.red.bold(
      "Name: " + err.name + " Message: " + err.message + " Stack: " + err.stack
    )
  );

  const statusCode = err.statusCode || 500;

  const response: IResponse = {
    success: false,
    message: err.message,
  };

  res.status(statusCode).json(response);
};

export default error;
