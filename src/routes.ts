import { Router } from "express";

// Routers
import { taskRouter, authRouter, projectRouter } from "./routes/";

const router = Router();

router.use("/task", taskRouter);
router.use("/auth", authRouter);
router.use("/project", projectRouter);

export default router;
