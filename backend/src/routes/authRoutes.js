import express from "express";

import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/authController.js";

import {
  registerValidation,
  loginValidation,
  updateProfileValidation,
} from "../validators/authValidator.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/register", registerValidation, registerUser);

router.post("/login", loginValidation, loginUser);


router.post("/logout", protect, logoutUser);

router.get("/profile", protect, getUserProfile);

router.put(
  "/profile",
  protect,
  updateProfileValidation,
  updateUserProfile
);


router.get(
  "/admin/dashboard",
  protect,
  authorize("admin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: `Welcome Admin ${req.user.name}`,
    });
  }
);

export default router;