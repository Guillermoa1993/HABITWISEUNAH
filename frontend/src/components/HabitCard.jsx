import React, { useEffect, useState } from "react";
import { postCheckin, hasCheckedInToday } from "../services/habitCheckinService";

const HabitCard = ({ habit, userId }) => {
  const [checkedIn, setCheckedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [streak, setStreak] = useState({ current: 0, best: 0 });

  useEffect(() => {
    // Al cargar, verificar si ya hizo check-in hoy
    hasCheckedInToday(habit.id, userId).then(setCheckedIn);
  }, [habit.id, userId]);

  const handleCheckin = async () => {
    setLoading(true);
    try {
      const res = await postCheckin(habit.id, userId);
      setStreak({ current: res.streakCurrent, best: res.streakBest });
      setCheckedIn(true);
      alert("¡Check-in registrado!");
    } catch (err) {
      alert("Error: ya hiciste check-in hoy o hubo un problema.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md mb-4 flex justify-between items-center">
      <div>
        <h4 className="text-xl font-semibold text-green-800">{habit.name}</h4>
        <p className="text-sm text-gray-500">
          Racha actual: {streak.current} — Mejor racha: {streak.best}
        </p>
      </div>
      <button
        onClick={handleCheckin}
        disabled={checkedIn || loading}
        className={`text-white font-bold py-2 px-4 rounded-xl ${
          checkedIn
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        }`}
      >
        {checkedIn ? "✔ Hecho" : "✔ Hoy"}
      </button>
    </div>
  );
};

export default HabitCard;
