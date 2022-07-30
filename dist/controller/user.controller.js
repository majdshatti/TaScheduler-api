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
exports.deleteUser = exports.resetPassword = exports.forgotPassword = exports.editUser = exports.getUserProfile = exports.getSingleUser = exports.getUsers = void 0;
// Middleware
const middleware_1 = require("../middleware");
// Services
const user_service_1 = require("../services/user.service");
// Utils
const utils_1 = require("../utils");
//* @desc Get all users with the apply of quering and filtering
//* @route GET /api/user
//* @access ADMIN
exports.getUsers = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(res.filter);
}));
//* @desc Get a single user by slug
//* @route GET /api/user/:slug
//* @access ADMIN
exports.getSingleUser = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userSlug = req.params.slug;
    const user = yield (0, user_service_1.getUserBySlug)(userSlug, "project");
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "user"), 404));
    res.status(200).json({
        success: true,
        data: user,
    });
}));
//* @desc Get a single user by slug
//* @route GET /api/user/:slug
//* @access ADMIN, REGISTRED USER
exports.getUserProfile = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userSlug = (_a = req.user.slug) !== null && _a !== void 0 ? _a : "";
    const user = yield (0, user_service_1.getUserBySlug)(userSlug, "project");
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "user"), 404));
    res.status(200).json({
        success: true,
        data: user,
    });
}));
//* @desc Edit user details
//* @route PUT /api/user/:slug
//* @access private
exports.editUser = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userSlug = req.params.slug;
    const userBody = req.body;
    let user = yield (0, user_service_1.getUserBySlug)(userSlug, "project");
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "user"), 404));
    user = yield (0, user_service_1.updateUser)(userSlug, userBody);
    res.status(200).json({
        success: true,
        data: user,
        message: (0, utils_1.getSuccessMessage)("edit", "user"),
    });
}));
exports.forgotPassword = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
exports.resetPassword = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () { }));
//* @desc Delete a user
//* @route DELETE /api/user/:slug
//* @access private
exports.deleteUser = (0, middleware_1.asyncHandler)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userSlug = req.params.slug;
    let user = yield (0, user_service_1.getUserBySlug)(userSlug);
    if (!user)
        return next(new utils_1.ErrorResponse((0, utils_1.getErrorMessage)("exist", "user"), 404));
    yield (0, user_service_1.destroyUser)(user);
    res.status(200).json({
        success: true,
        message: (0, utils_1.getSuccessMessage)("delete", "user"),
    });
}));
