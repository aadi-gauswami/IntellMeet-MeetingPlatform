import User from "../models/User.js";

export const createUser = async (userData) => {
  return await User.create(userData);
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password +refreshToken");
};

export const findUserById = async (userId) => {
  return await User.findById(userId);
};

export const findUserByIdWithPassword = async (userId) => {
  return await User.findById(userId).select("+password +refreshToken");
};

export const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  });
};

export const saveUser = async (user) => {
  return await user.save();
};

export const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const getAllUsers = async () => {
  return await User.find().sort({ createdAt: -1 });
};

export const countUsers = async () => {
  return await User.countDocuments();
};