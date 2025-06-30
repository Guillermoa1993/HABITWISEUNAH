import React, { useEffect, useState } from "react";
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
} from "./services/habitService";
import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const translations = {
  es: {
    welcome: "¡Bienvenido a HabitWise!",
    user: "Usuario",
    logout: "Cerrar sesión",
    addHabit: "Agregar",
    newHabit: "Nuevo hábito",
    edit: "Editar",
    delete: "Eliminar",
    save: "Guardar",
    cancel: "Cancelar",
    themeDark: "Tema oscuro",
    themeLight: "Tema claro",
    langEsp: "Español",
    langEng: "Inglés",
  },
  en: {
    welcome: "Welcome to HabitWise!",
    user: "User",
    logout: "Logout",
    addHabit: "Add",
    newHabit: "New habit",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    themeDark: "Dark mode",
    themeLight: "Light mode",
    langEsp: "Spanish",
    langEng: "English",
  },
};

const Home = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [habits, setHabits] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [lang, setLang] = useState("es");
  const [streak, setStreak] = useState({ current: 0, best: 0 });

  const t = translations[lang];

  useEffect(() => {
    loadHabits();
  }, []);

  const loadHabits = async () => {
    const data = await getHabits();
    setHabits(data);
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("user");
    navigate("/");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (newTitle.trim()) {
      await createHabit(newTitle.trim());
      setNewTitle("");
      loadHabits();
    }
  };

  const startEdit = (habit) => {
    setEditId(habit._id);
    setEditTitle(habit.title);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (editTitle.trim()) {
      await updateHabit(editId, editTitle.trim());
      setEditId(null);
      setEditTitle("");
      loadHabits();
    }
  };

  const handleDelete = async (id) => {
    await deleteHabit(id);
    loadHabits();
  };

  const toggle = (id) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit._id === id ? { ...habit, completed: !habit.completed } : habit
      )
    );
  };

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white"
          : "min-h-screen bg-gradient-to-br from-blue-100 to-green-100 text-black"
      }
    >
      <div
        className={
          "max-w-3xl mx-auto p-8 rounded-2xl shadow-xl " +
          (darkMode ? "bg-gray-900" : "bg-white")
        }
      >
        {/* Selector de idioma y tema */}
        <div className="flex justify-end items-center gap-4 mb-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className={
              "border px-2 py-1 rounded transition " +
              (darkMode
                ? "bg-gray-800 text-white border-gray-700"
                : "bg-white text-black border-gray-300")
            }
          >
            <option value="es">{t.langEsp}</option>
            <option value="en">{t.langEng}</option>
          </select>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="border px-4 py-2 rounded"
          >
            {darkMode ? t.themeLight : t.themeDark}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-green-700 mb-2">{t.welcome}</h1>
        <p className={darkMode ? "text-gray-300 mb-4" : "text-gray-600 mb-4"}>
          {t.user}: <span className="font-medium">{user?.email}</span>
        </p>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-xl font-semibold mb-6"
        >
          {t.logout}
        </button>

        <form onSubmit={handleCreate} className="flex gap-2 mb-6">
          <input
            type="text"
            maxLength={50}
            className={
              "border p-2 rounded-xl flex-1 transition " +
              (darkMode
                ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                : "bg-white text-black placeholder-gray-500 border-gray-300")
            }
            placeholder={t.newHabit}
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />
          <button
            className="bg-green-500 text-white px-4 rounded-xl"
            type="submit"
          >
            {t.addHabit}
          </button>
        </form>

        {/* Lista de hábitos */}
        <ul>
          {habits.map((habit) =>
            editId === habit._id ? (
              <li key={habit._id} className="flex items-center gap-2 mb-2">
                <form onSubmit={handleUpdate} className="flex gap-2">
                  <input
                    type="text"
                    maxLength={50}
                    className={
                      "border p-1 rounded-xl transition " +
                      (darkMode
                        ? "bg-gray-800 text-white placeholder-gray-400 border-gray-700"
                        : "bg-white text-black placeholder-gray-500 border-gray-300")
                    }
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    required
                  />
                  <button
                    className="bg-blue-500 text-white px-2 rounded-xl"
                    type="submit"
                  >
                    {t.save}
                  </button>
                  <button
                    className="text-red-500"
                    type="button"
                    onClick={() => setEditId(null)}
                  >
                    {t.cancel}
                  </button>
                </form>
              </li>
            ) : (
              <div className={"p-4 rounded-xl shadow-md mb-4" + 
              ( darkMode ? "bg-gray-800" : "bg-white")}>
                <li
                  key={habit._id}
                  className="flex justify-between items-center"
                >
                  {/* Contenido izquierdo */}
                  <div className="flex-1">
                    <span className="block font-medium">{habit.title}</span>
                    {/* <p className="text-sm text-gray-500">
                      Racha actual: {habit.current} — Mejor racha: {habit.best}
                    </p> */}
                    <p className="text-sm text-gray-500">
                      Racha actual: {streak.current} — Mejor racha:{" "}
                      {streak.best}
                    </p>
                  </div>

                  {/* Botones a la derecha */}
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => toggle(habit._id)}
                      className={`px-3 py-1 rounded-xl font-medium shadow transition-all duration-200
                        ${
                          habit.completed
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-700"
                        }
                        hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400`}
                    >
                      {habit.completed ? "✅" : "⭕"}
                    </button>

                    <button
                      className="text-blue-500 hover:underline"
                      onClick={() => startEdit(habit)}
                    >
                      {t.edit}
                    </button>

                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDelete(habit._id)}
                    >
                      {t.delete}
                    </button>
                  </div>
                </li>
              </div>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Home;