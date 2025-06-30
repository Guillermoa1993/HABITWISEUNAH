import express from "express";
import { verifyFirebaseToken } from "../middlewares/authMiddleware.js";
import { createHabit, getHabits, updateHabit, deleteHabit } from "../controllers/habitController.js";

const router = express.Router();

router.use(verifyFirebaseToken);

router.route("/")
  .get(getHabits)
  .post(createHabit);

router.route("/:id")
  .put(updateHabit)
  .delete(deleteHabit);

export default router;
