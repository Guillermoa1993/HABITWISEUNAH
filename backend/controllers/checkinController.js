import Checkin from "../models/checkinModel.js";
import { differenceInDays } from "date-fns";

export const getCheckins = async (req, res) => {
  try {
    const { id } = req.params; // habitId
    const { userId, from, to } = req.query;

    const query = {
      habitId: id,
      userId,
      date: { $gte: new Date(from), $lte: new Date(to) }
    };

    const checkins = await Checkin.find(query);
    res.json(checkins);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCheckin = async (req, res) => {
  try {
    const { id } = req.params; // habitId
    const { userId } = req.body;

    const today = new Date();
    const todayOnly = new Date(today.toDateString());

    // Verificar si ya existe un check-in para hoy
    const exists = await Checkin.findOne({
      habitId: id,
      userId,
      date: todayOnly
    });

    if (exists) {
      return res.status(400).json({ message: "Ya hiciste check-in hoy" });
    }

    // Aquí deberías tener lógica de racha, por ahora simulamos
    const checkin = new Checkin({
      habitId: id,
      userId,
      date: todayOnly,
      streakCurrent: 1,
      streakBest: 1
    });

    await checkin.save();
    res.json(checkin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
