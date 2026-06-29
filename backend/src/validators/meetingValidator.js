import { body, param, validationResult } from "express-validator";

// Handle Validation Errors
export const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: errors.array(),
    });
  }

  next();
};

export const createMeetingValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Meeting title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("meetingType")
    .optional()
    .isIn(["instant", "scheduled", "recurring"])
    .withMessage("Invalid meeting type"),

  body("scheduledDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid scheduled date"),

  body("duration")
    .optional()
    .isInt({ min: 5, max: 720 })
    .withMessage("Duration must be between 5 and 720 minutes"),

  body("meetingPassword")
    .optional()
    .isLength({ min: 4, max: 20 })
    .withMessage("Meeting password must be between 4 and 20 characters"),

  body("waitingRoom")
    .optional()
    .isBoolean()
    .withMessage("waitingRoom must be true or false"),

  body("recordingEnabled")
    .optional()
    .isBoolean()
    .withMessage("recordingEnabled must be true or false"),

  body("screenShareEnabled")
    .optional()
    .isBoolean()
    .withMessage("screenShareEnabled must be true or false"),

  body("chatEnabled")
    .optional()
    .isBoolean()
    .withMessage("chatEnabled must be true or false"),

  validate,
];

export const updateMeetingValidation = [
  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage("Title must be between 3 and 100 characters"),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters"),

  body("meetingType")
    .optional()
    .isIn(["instant", "scheduled", "recurring"])
    .withMessage("Invalid meeting type"),

  body("status")
    .optional()
    .isIn(["upcoming", "live", "completed", "cancelled"])
    .withMessage("Invalid meeting status"),

  body("duration")
    .optional()
    .isInt({ min: 5, max: 720 })
    .withMessage("Duration must be between 5 and 720 minutes"),

  validate,
];

export const meetingIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid meeting ID"),

  validate,
];

export const meetingCodeValidation = [
  param("meetingCode")
    .notEmpty()
    .withMessage("Meeting code is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("Invalid meeting code"),

  validate,
];