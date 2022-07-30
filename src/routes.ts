import { Router } from "express";

// Routers
import { taskRouter, authRouter, projectRouter, userRouter } from "./routes/";

// Middlewares
import { authenticate } from "./middleware";

const router = Router();

router.use("/auth", authRouter);
router.use("/task", authenticate, taskRouter);
router.use("/project", authenticate, projectRouter);
router.use("/user", authenticate, userRouter);

export default router;
