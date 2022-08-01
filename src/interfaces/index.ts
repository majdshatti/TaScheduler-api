import { IUser, IUserDocument } from "./user.interface";
import { ITask, ITaskDocument, Status } from "./task.interface";
import { ITodo, ITodoDocument } from "./todo.interface";
import { IProject, IProjectDocument } from "./project.interface";
import { IFilterResponse, IResponse } from "./response.interface";
import { IAuthRequest } from "./request.interface";
import { IMailOptions } from "./email.intreface";

// Socket.io Interfaces
import {
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
} from "./socket.interface";

export {
  IAuthRequest,
  IResponse,
  IFilterResponse,
  IUser,
  IUserDocument,
  ITask,
  ITaskDocument,
  IProject,
  IProjectDocument,
  ITodo,
  ITodoDocument,
  IMailOptions,
  Status,
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
};
