import { Router } from "express";

// Middlewares
import { authValidate, validationResults } from "../middleware/";

// Controller
import {
  login,
  register,
  forgotPassword,
  resetPassword,
} from "../controller/auth.controller";

const router = Router();

router.route("/");

router.route("/login").post(login, authValidate("login"), validationResults());

router
  .route("/register")
  .post(authValidate("register"), validationResults(), register);

router
  .route("/resetpassword/:token")
  .post(authValidate("reset"), validationResults(), resetPassword);

router
  .route("/forgotpassword")
  .post(authValidate("forgot"), validationResults(), forgotPassword);

export default router;
