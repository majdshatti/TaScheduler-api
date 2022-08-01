import { IUserDocument } from "./";
import { Request } from "express";

export interface IAuthRequest extends Request {
  user: IUserDocument;
}
