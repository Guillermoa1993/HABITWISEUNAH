import axios from "axios";
import { getAuth } from "firebase/auth";

async function getAuthHeader() {
  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return {};
  const token = await user.getIdToken();
  return { Authorization: `Bearer ${token}` };
}

export async function getHabits() {
  const headers = await getAuthHeader();
  const res = await axios.get("http://localhost:5000/api/habits", { headers });
  return res.data;
}

export async function createHabit(title) {
  const headers = await getAuthHeader();
  const res = await axios.post("http://localhost:5000/api/habits", { title }, { headers });
  return res.data;
}

export async function updateHabit(id, title) {
  const headers = await getAuthHeader();
  const res = await axios.put(`http://localhost:5000/api/habits/${id}`, { title }, { headers });
  return res.data;
}

export async function deleteHabit(id) {
  const headers = await getAuthHeader();
  const res = await axios.delete(`http://localhost:5000/api/habits/${id}`, { headers });
  return res.data;
}


export async function checkinshabit(id) {
  const headers = await get();
  const res = await axios.get(`http://localhost:5000/api/habits/${id}`, { headers });
  return res.data;
}