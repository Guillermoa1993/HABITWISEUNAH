import express from "express";
import {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .put(updateUser)
  .delete(deleteUser);

export default router;