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
exports.register = exports.login = void 0;
// Environment Settings
const settings_1 = require("../config/settings");
// Middlewares
const middleware_1 = require("../middleware");
// Services
const auth_service_1 = require("../services/auth.service");
// Utils
const utils_1 = require("../utils");
//* @desc: Login user
//* @route: POST /api/auth/login
//* @access: public
exports.login = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const user = yield (0, auth_service_1.findUserByCreds)(username, password);
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("credentials", "username/password"), 400));
    const token = user.getSignedJwtToken();
    res.status(200).cookie("token", token, (0, settings_1.getCookieOptions)()).json({
        success: true,
        token,
    });
}));
//* @desc: Register user
//* @route: POST /api/auth/register
//* @access: public
exports.register = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    // Save user
    const user = yield (0, auth_service_1.createUser)(userBody);
    // Generate a token
    const token = user.getSignedJwtToken();
    res.status(201).json({
        success: true,
        token: token,
    });
}));
