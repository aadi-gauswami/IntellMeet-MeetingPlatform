import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import { findUserById } from "../repositories/userRepository.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {

      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await findUserById(decoded.id);

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      req.user = {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }
});