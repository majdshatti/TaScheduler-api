import { IUserDocument } from "./";
import { Request } from "express";

// An inteface for holding req.user
export interface IAuthRequest extends Request {
  user: IUserDocument;
}
