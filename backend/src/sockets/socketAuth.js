import jwt from "jsonwebtoken";
import User from "../models/User.js";

const socketAuth = async (socket, next) => {
  try {
    
    let token =
      socket.handshake.auth?.token ||
      socket.handshake.headers?.authorization;

    if (!token) {
      return next(new Error("Authentication token is required"));
    }

    // Remove "Bearer "
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    if (user.status && user.status !== "active") {
      return next(new Error("User account is inactive"));
    }

    socket.user = user;

    next();
  } catch (error) {
    next(new Error("Unauthorized socket connection"));
  }
};

export default socketAuth;