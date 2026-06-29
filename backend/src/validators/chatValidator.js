import { body, param, query, validationResult } from "express-validator";


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

export const sendMessageValidation = [
  body("meetingId")
    .notEmpty()
    .withMessage("Meeting ID is required")
    .isMongoId()
    .withMessage("Invalid Meeting ID"),

  body("message")
    .optional()
    .trim()
    .isLength({ min: 1, max: 5000 })
    .withMessage("Message must be between 1 and 5000 characters"),

  body("messageType")
    .optional()
    .isIn([
      "text",
      "image",
      "file",
      "audio",
      "video",
      "system",
    ])
    .withMessage("Invalid message type"),

  body("replyTo")
    .optional()
    .isMongoId()
    .withMessage("Invalid Reply Message ID"),

  validate,
];

export const editMessageValidation = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid Message ID"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 1, max: 5000 })
    .withMessage("Message must be between 1 and 5000 characters"),

  validate,
];

export const deleteMessageValidation = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid Message ID"),

  validate,
];

export const reactionValidation = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid Message ID"),

  body("emoji")
    .trim()
    .notEmpty()
    .withMessage("Emoji is required")
    .isLength({ min: 1, max: 10 })
    .withMessage("Invalid emoji"),

  validate,
];

export const readValidation = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid Message ID"),

  validate,
];

export const pinValidation = [
  param("messageId")
    .isMongoId()
    .withMessage("Invalid Message ID"),

  validate,
];

export const meetingMessagesValidation = [
  param("meetingId")
    .isMongoId()
    .withMessage("Invalid Meeting ID"),

  validate,
];

export const searchValidation = [
  param("meetingId")
    .isMongoId()
    .withMessage("Invalid Meeting ID"),

  query("keyword")
    .trim()
    .notEmpty()
    .withMessage("Keyword is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Keyword must be between 2 and 100 characters"),

  validate,
];