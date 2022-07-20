import { langType } from "../../types";

class ErrorResponse extends Error {
  statusCode: number;
  multiLangMessage: langType;

  constructor(message: langType, statusCode: number) {
    super(message.en);
    this.multiLangMessage = message;
    this.statusCode = statusCode;
  }
}

export default ErrorResponse;
