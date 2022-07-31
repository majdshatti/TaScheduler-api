"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Middlewares
const middleware_1 = require("../middleware/");
// Controller
const auth_controller_1 = require("../controller/auth.controller");
const router = (0, express_1.Router)();
router.route("/");
router.route("/login").post(auth_controller_1.login, (0, middleware_1.authValidate)("login"), (0, middleware_1.validationResults)());
router
    .route("/register")
    .post((0, middleware_1.authValidate)("register"), (0, middleware_1.validationResults)(), auth_controller_1.register);
router
    .route("/resetpassword/:token")
    .post((0, middleware_1.authValidate)("reset"), (0, middleware_1.validationResults)(), auth_controller_1.resetPassword);
router
    .route("/forgotpassword")
    .post((0, middleware_1.authValidate)("forgot"), (0, middleware_1.validationResults)(), auth_controller_1.forgotPassword);
exports.default = router;
