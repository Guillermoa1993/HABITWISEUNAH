import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";

import userRoutes from "./routes/userRoute.js";
import checkinRoutes from "./routes/checkinRoute.js";
import habitRoutes from "./routes/habitRoute.js";

dotenv.config();
const { PORT = 3000, MONGO_URL } = process.env;
if (!MONGO_URL) throw new Error("MONGO_URL is not defined");

const app = express(); // 🔹 Primero se declara `app`
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 🔹 Ahora sí puedes usar las rutas
app.use("/api/users", userRoutes);
app.use("/api/checkins", checkinRoutes);
app.use("/api/habits", habitRoutes);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });
