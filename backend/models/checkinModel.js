// models/checkinModel.js
import mongoose from "mongoose";

const checkinSchema = new mongoose.Schema({
  habitId: String,
  userId: String,
  date: Date,
  streakCurrent: Number,
  streakBest: Number,
});

export default mongoose.model("Checkin", checkinSchema);
