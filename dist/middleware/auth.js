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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const _1 = require("./");
const utils_1 = require("../utils");
const user_service_1 = require("../services/user.service");
exports.authenticate = (0, _1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = "";
    // Check for a bearer token is sent form the client
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];
    if (!token)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "user"), 401));
    try {
        // Get a user id from token
        const userId = yield (0, utils_1.verifyToken)(token);
        // Check if user id is vailed
        if (!userId)
            return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "user"), 401));
        // Get user by id
        const user = yield (0, user_service_1.getUserById)(userId);
        // Check if user exist
        if (!user)
            return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "user"), 401));
        req.user = user;
        next();
    }
    catch (error) {
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("auth", "user"), 401));
    }
}));
