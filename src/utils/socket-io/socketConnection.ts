// Socket.io
import { Server } from "socket.io";
import verifyToken from "../auth/verifyToken";
import { ErrorResponse, getErrorMessage } from "../../utils";

// Socket.io Interfaces
import {
  ServerToClientEvents,
  InterServerEvents,
  ClientToServerEvents,
  SocketData,
} from "./../../interfaces";

// User service
import { getUserById } from "../../services/user.service";

let clients: { userId: string; socketId: string }[] = [];

let io: Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export const socketConnection = (httpServer: any) => {
  io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer);

  // Socket middleware
  io.use(async (socket, next) => {
    const token = socket.handshake.auth.token;

    if (!token) return next(new ErrorResponse({ en: "test", ar: "test" }, 401));

    // Get a user id from token
    const userId = await verifyToken(token);

    // Check if user id is vailed
    if (!userId)
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

    // Get user by id
    const user = await getUserById(userId);

    // Check if user exist
    if (!user)
      return next(new ErrorResponse(getErrorMessage("auth", "user"), 401));

    if (!user)
      return next(new ErrorResponse(getErrorMessage("exist", "User"), 404));

    socket.data.user = user;
    next();
  });

  // Socket Connection
  io.on("connection", function (socket) {
    const userId = socket.data.user?._id.toString();
    console.log(`A client has connect on socket id ${socket.id}`);

    if (userId) assignUser(userId, socket.id);

    socket.on("disconnect", function () {
      console.log(`A client has disconnected on socket id ${socket.id}`);

      unAssignUser(userId);
    });

    console.log(clients);
  });
};

const assignUser = (userId: string, socketId: string) => {
  for (const client of clients) {
    if (client.userId === userId) {
      client.socketId = socketId;
      return;
    }
  }
  clients.push({ userId, socketId });
};

const unAssignUser = (userId: string) => {
  for (let i = 0; i < clients.length; i++) {
    if (clients[i].userId === userId) {
      clients.splice(i, 1);
      return true;
    }
  }
  return false;
};

export const sendMessage = (userId: string, key: string, body: Object) => {
  try {
    for (const client of clients) {
      console.log(userId, client.userId);
      if (userId === client.userId) {
        io.to(`socket#${client.socketId}`).emit("notifyTask", key, body);
        return true;
      }
    }
  } catch (err) {
    console.log(err);
  }

  return false;
};

//? recieveMessage()
