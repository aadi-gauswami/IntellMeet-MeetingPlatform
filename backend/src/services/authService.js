import generateToken from "../utils/generateToken.js";

import {
  createUser,
  findUserByEmail,
  findUserById,
  updateUser,
  saveUser,
} from "../repositories/userRepository.js";

/**
 * Register User
 */
export const register = async ({ name, email, password }) => {
  // Check if email already exists
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Create user
  const user = await createUser({
    name,
    email,
    password,
  });

  // Generate JWT
  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

/**
 * Login User
 */
export const login = async ({ email, password }) => {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare Password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  // Update Last Login
  user.lastLogin = new Date();

  await saveUser(user);

  const token = generateToken(user._id);

  return {
    user,
    token,
  };
};

/**
 * Get Profile
 */
export const getProfile = async (userId) => {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Update Profile
 */
export const updateProfile = async (userId, updateData) => {
  const user = await updateUser(userId, updateData);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

/**
 * Logout User
 */
export const logout = async () => {
  return {
    message: "Logout successful",
  };
};