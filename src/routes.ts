import { Router } from "express";

import task from "./routes/task";

const router = Router();

router.use("/task", task);

export default router;
