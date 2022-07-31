import { IUser, IUserDocument } from "./user.interface";
import { ITask, Status } from "./task.interface";
import ITodo from "./todo.interface";
import IProject from "./project.interface";
import {
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
} from "./socket.interface";
import { IFilterResponse, IAuthRequest, IResponse } from "./response.interface";
import { IMailOptions } from "./email.intreface";

export {
  IResponse,
  IUser,
  ITask,
  IProject,
  ITodo,
  Status,
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
  IFilterResponse,
  IAuthRequest,
  IUserDocument,
  IMailOptions,
};
