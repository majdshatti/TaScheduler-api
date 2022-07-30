import { langType } from "./../types";
import { Response, Request } from "express";
import { IUser } from "./";

interface IError {
  message: string;
  value?: string;
  field?: string;
}

interface IResponse {
  success: boolean;
  message?: string | langType;
  data?: Object;
  errors?: IError[];
}

export interface IFilterResponse extends Response {
  filter: {
    success: boolean;
    rowCount: number;
    pageCount: number;
    pagination: Object;
    data: Object;
  };
}

export interface IAuthRequest extends Request {
  user: IUser;
}

export default IResponse;
