import { Router } from "express";

// User Controller
import {
  getUsers,
  getSingleUser,
  getUserProfile,
  editUser,
  deleteUser,
} from "../controller/user.controller";

// Middlewares
import { validationResults, userValidate, filter } from "../middleware/";

const router = Router();

router.route("/profile").get(getUserProfile);

router
  .route("/:slug")
  .get(getSingleUser)
  .put(userValidate("edit"), validationResults(), editUser)
  .delete(deleteUser);

router.route("/").get(filter("User", "project"), getUsers);

export default router;
