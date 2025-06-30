import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  uid: { type: String, required: true, index: true }, // el dueño
  title: { type: String, required: true, maxlength: 50 },
});

export default mongoose.model("Habit", habitSchema);
