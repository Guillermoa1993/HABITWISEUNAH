import Habit from "../models/habitModel.js";

// Crear hábito
export const createHabit = async (req, res) => {
  const { title } = req.body;
  const uid = req.user.uid; // gracias al middleware de verificación
  if (!title || title.length > 50) {
    return res.status(400).json({ message: "Título requerido y ≤ 50 chars" });
  }
  const habit = await Habit.create({ uid, title });
  res.status(201).json(habit);
};

// Obtener todos los hábitos del usuario
export const getHabits = async (req, res) => {
  const uid = req.user.uid;
  const habits = await Habit.find({ uid });
  res.json(habits);
};

// Actualizar hábito
export const updateHabit = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const uid = req.user.uid;
  const habit = await Habit.findOneAndUpdate(
    { _id: id, uid },
    { title },
    { new: true }
  );
  if (!habit) return res.status(404).json({ message: "No existe el hábito o no eres el dueño" });
  res.json(habit);
};

// Eliminar hábito
export const deleteHabit = async (req, res) => {
  const { id } = req.params;
  const uid = req.user.uid;
  const habit = await Habit.findOneAndDelete({ _id: id, uid });
  if (!habit) return res.status(404).json({ message: "No existe el hábito o no eres el dueño" });
  res.json({ message: "Hábito eliminado" });
};
