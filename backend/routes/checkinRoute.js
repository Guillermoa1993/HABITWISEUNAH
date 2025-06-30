import express from "express";
import {
  getCheckins,
  createCheckin
} from "../controllers/checkinController.js";

const router = express.Router();

router.get("/:id/checkins", getCheckins);
router.post("/:id/checkins", createCheckin);

export default router;
