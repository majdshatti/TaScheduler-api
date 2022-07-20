import { Router } from "express";

// Middlewares
import { authValidate, validationResults } from "../middleware/";

// Controller
import { login, register } from "../controller/auth.controller";

const router = Router();

router.route("/");

router.route("/login").post(login, authValidate("login"), validationResults());

router
  .route("/register")
  .post(authValidate("register"), validationResults(), register);
export default router;
