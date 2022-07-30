"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// User Controller
const user_controller_1 = require("../controller/user.controller");
// Middlewares
const middleware_1 = require("../middleware/");
const router = (0, express_1.Router)();
router.route("/profile").get(user_controller_1.getUserProfile);
router
    .route("/:slug/forgotpassword")
    .post((0, middleware_1.userValidate)("forgot"), (0, middleware_1.validationResults)(), user_controller_1.forgotPassword);
router
    .route("/:slug/resetpassword")
    .post((0, middleware_1.userValidate)("reset"), (0, middleware_1.validationResults)(), user_controller_1.resetPassword);
router
    .route("/:slug")
    .get(user_controller_1.getSingleUser)
    .put((0, middleware_1.userValidate)("edit"), (0, middleware_1.validationResults)(), user_controller_1.editUser)
    .delete((0, middleware_1.userValidate)("delete"), (0, middleware_1.validationResults)(), user_controller_1.deleteUser);
router.route("/").get((0, middleware_1.filter)("User", "project"), user_controller_1.getUsers);
exports.default = router;
