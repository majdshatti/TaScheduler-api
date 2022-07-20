"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Routers
const routes_1 = require("./routes/");
const router = (0, express_1.Router)();
router.use("/task", routes_1.taskRouter);
router.use("/auth", routes_1.authRouter);
router.use("/project", routes_1.projectRouter);
exports.default = router;
