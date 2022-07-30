"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Routers
const routes_1 = require("./routes/");
// Middlewares
const middleware_1 = require("./middleware");
const router = (0, express_1.Router)();
router.use("/auth", routes_1.authRouter);
router.use("/task", middleware_1.authenticate, routes_1.taskRouter);
router.use("/project", middleware_1.authenticate, routes_1.projectRouter);
router.use("/user", middleware_1.authenticate, routes_1.userRouter);
exports.default = router;
