import ErrorResponse from "./error/errorResponse";
import validate from "./validation/validate";
import { getErrorMessage } from "./messages/errorMessages";
import { getSuccessMessage } from "./messages/successMessages";
import isObjKey from "./object/isObjectKey";
import { socketConnection, sendMessage } from "./socket-io/socketConnection";
import verifyToken from "./auth/verifyToken";
import getPopulatedObject from "./object/populatedObject";
import getTodoIndexById from "./array/getIndex";
import mailTemplate from "./mail/mailTemplate";
import sendEmail from "./mail/sendEmail";
import resetTemplate from "./mail/templates/resetPassword";

export {
  ErrorResponse,
  getErrorMessage,
  getSuccessMessage,
  validate,
  isObjKey,
  socketConnection,
  verifyToken,
  sendMessage,
  getPopulatedObject,
  getTodoIndexById,
  mailTemplate,
  sendEmail,
  resetTemplate,
};
