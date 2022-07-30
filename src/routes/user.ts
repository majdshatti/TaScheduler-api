import { Router } from "express";

// User Controller
import {
  getUsers,
  getSingleUser,
  getUserProfile,
  editUser,
  deleteUser,
  forgotPassword,
  resetPassword,
} from "../controller/user.controller";

// Middlewares
import { validationResults, userValidate, filter } from "../middleware/";

const router = Router();

router.route("/profile").get(getUserProfile);

router
  .route("/:slug/forgotpassword")
  .post(userValidate("forgot"), validationResults(), forgotPassword);
router
  .route("/:slug/resetpassword")
  .post(userValidate("reset"), validationResults(), resetPassword);

router
  .route("/:slug")
  .get(getSingleUser)
  .put(userValidate("edit"), validationResults(), editUser)
  .delete(userValidate("delete"), validationResults(), deleteUser);

router.route("/").get(filter("User", "project"), getUsers);

export default router;
