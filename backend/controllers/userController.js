import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

// CREATE
export const createUser = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(409).json({ error: "User already exists" });
  }

  const user = await User.create({ name, email });
  res.status(201).json({ data: user });
});

// READ ALL
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json({ data: users });
});

// UPDATE
export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ data: user });
});

// DELETE
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res.status(200).json({ message: "User deleted successfully" });
});
