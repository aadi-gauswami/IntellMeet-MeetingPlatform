import asyncHandler from "../utils/asyncHandler.js";

import {
  register,
  login,
  logout,
  getProfile,
  updateProfile,
} from "../services/authService.js";


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const { user, token } = await register({
    name,
    email,
    password,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    },
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await login({
    email,
    password,
  });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
      },
      token,
    },
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const response = await logout();

  res.status(200).json({
    success: true,
    message: response.message,
  });
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await getProfile(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const updateUserProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateProfile(req.user.id, req.body);

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});