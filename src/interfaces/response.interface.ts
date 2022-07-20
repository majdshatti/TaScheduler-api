import { langType } from "./../types";

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

export default IResponse;
