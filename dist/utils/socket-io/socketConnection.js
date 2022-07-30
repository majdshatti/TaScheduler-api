"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.socketConnection = void 0;
// Socket.io
const socket_io_1 = require("socket.io");
const verifyToken_1 = __importDefault(require("../auth/verifyToken"));
const utils_1 = require("../../utils");
let clients = [];
let io;
const socketConnection = (httpServer) => {
    io = new socket_io_1.Server(httpServer);
    // Socket middleware
    io.use((socket, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = socket.handshake.auth.token;
        if (!token)
            return next(new utils_1.ErrorResponse({ en: "test", ar: "test" }, 401));
        const user = yield (0, verifyToken_1.default)(token);
        if (!user)
            return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "User"), 404));
        socket.data.user = user;
        next();
    }));
    // Socket Connection
    io.on("connection", function (socket) {
        var _a;
        const userId = (_a = socket.data.user) === null || _a === void 0 ? void 0 : _a._id.toString();
        console.log(`A client has connect on socket id ${socket.id}`);
        if (userId)
            assignUser(userId, socket.id);
        socket.on("disconnect", function () {
            console.log(`A client has disconnected on socket id ${socket.id}`);
            unAssignUser(userId);
        });
        console.log(clients);
    });
};
exports.socketConnection = socketConnection;
const assignUser = (userId, socketId) => {
    for (const client of clients) {
        if (client.userId === userId) {
            client.socketId = socketId;
            return;
        }
    }
    clients.push({ userId, socketId });
};
const unAssignUser = (userId) => {
    for (let i = 0; i < clients.length; i++) {
        if (clients[i].userId === userId) {
            clients.splice(i, 1);
            return true;
        }
    }
    return false;
};
const sendMessage = (userId, key, body) => {
    try {
        for (const client of clients) {
            console.log(userId, client.userId);
            if (userId === client.userId) {
                io.to(`socket#${client.socketId}`).emit("notifyTask", key, body);
                return true;
            }
        }
    }
    catch (err) {
        console.log(err);
    }
    return false;
};
exports.sendMessage = sendMessage;
//? recieveMessage()
