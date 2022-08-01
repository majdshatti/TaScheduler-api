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
exports.resetPassword = exports.forgotPassword = exports.register = exports.login = void 0;
const crypto_1 = __importDefault(require("crypto"));
// Middlewares
const middleware_1 = require("../middleware");
// Services
const auth_service_1 = require("../services/auth.service");
const user_service_1 = require("../services/user.service");
// Models
const model_1 = require("../model/");
// Utils
const utils_1 = require("../utils");
//* @desc: Login user
//* @route: POST /api/auth/login
//* @access: `Public`
exports.login = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    // Get user by email and password
    const user = yield (0, auth_service_1.findUserByCreds)(username, password);
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("credentials", "username/password"), 400));
    // Get a vaild token
    const token = user.getSignedJwtToken();
    res.status(200).json({
        success: true,
        token,
    });
}));
//* @desc: Register user
//* @route: POST /api/auth/register
//* @access: `Public`
exports.register = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userBody = req.body;
    // Save user
    const user = yield (0, auth_service_1.createUser)(userBody);
    res.status(201).json({
        success: true,
    });
}));
//* @desc: Make a reset password request
//* @route: POST /api/auth/forgotpassword
//* @access: `PUBLIC`
exports.forgotPassword = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    // Get user by email
    const user = yield (0, user_service_1.getUserByCondition)({ email });
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "email"), 404));
    // Hashs token and return unhashed token for the user
    const resetToken = user.getResetPasswordToken();
    // Save hashed token
    yield user.save();
    try {
        // Send an email with a reset like to the user
        yield (0, utils_1.sendEmail)({
            email: user.email,
            subject: "Password reset token",
            template: "resetPassword",
            value: `${req.protocol}://localhost:3000/reset/${resetToken}`,
        });
    }
    catch (error) {
        console.log(error);
        // if failed to send an email
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        yield user.save();
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("operation", "email"), 500));
    }
    res.status(200).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("emailSent", "user"),
    });
}));
exports.resetPassword = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    // Hash the token sent from the user
    const resetPasswordToken = crypto_1.default
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");
    // find by the hashed token
    const user = yield model_1.User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    // if failed to get results then token is not valid
    if (!user) {
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("invalidToken", "token"), 400));
    }
    // Set new password
    user.password = password;
    // Unset reset password fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    yield user.save();
    res.status(200).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("resetPass", "email"),
    });
}));
