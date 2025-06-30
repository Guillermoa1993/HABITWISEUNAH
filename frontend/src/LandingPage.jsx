import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-blue-200">
      <h1 className="text-4xl font-bold text-green-700 mb-4">HabitWise</h1>
      <p className="mb-8 max-w-lg text-center text-gray-600">
        ¡Bienvenido a la app para crear, compartir y cumplir tus hábitos junto a tus amigos! Lleva tu progreso y motívate cada día.
      </p>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded-xl transition"
        >
          Iniciar sesión
        </button>
        <button
          onClick={() => navigate("/register")}
          className="bg-white border-2 border-green-500 text-green-600 font-semibold py-2 px-8 rounded-xl hover:bg-green-100 transition"
        >
          Registrarse
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
