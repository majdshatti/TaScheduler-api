interface IError {
  message: string;
  value?: string;
  field?: string;
}

interface IResponse {
  success: boolean;
  message?: string;
  data?: Object;
  errors?: IError[];
}

export default IResponse;
