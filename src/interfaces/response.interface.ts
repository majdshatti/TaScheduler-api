import { langType } from "./../types";
import { Response } from "express";

// Forming errors object interface
interface IError {
  message: string;
  value?: string;
  field?: string;
}

// Forming a response to the client
export interface IResponse {
  success: boolean;
  message?: string | langType;
  data?: Object;
  errors?: IError[];
}

// An interface for holding res.filter
export interface IFilterResponse extends Response {
  filter: {
    success: boolean;
    rowCount: number;
    pageCount: number;
    pagination: Object;
    data: Object;
  };
}

export default IResponse;
