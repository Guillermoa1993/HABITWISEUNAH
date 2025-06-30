import axios from "axios";
import { format } from "date-fns";

// ✅ Consultar check-ins en un rango
export async function getCheckins(habitId, userId, from, to) {
  const res = await axios.get(`http://localhost:5000/api/checkins/${habitId}/checkins`, {
    params: { userId, from, to }
  });
  return res.data;
}

// ✅ Crear check-in de hoy
export async function postCheckin(habitId, userId) {
  const res = await axios.post(`http://localhost:5000/api/checkins/${habitId}/checkins`, {
    userId
  });
  return res.data; // { streakCurrent, streakBest }
}

// ✅ Verificar si hay check-in hoy
export async function hasCheckedInToday(habitId, userId) {
  const today = format(new Date(), "yyyy-MM-dd");
  const res = await getCheckins(habitId, userId, today, today);
  return res.length > 0;
}
