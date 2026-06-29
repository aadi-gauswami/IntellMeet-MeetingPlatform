import express from "express";

// Controllers
import {
  createMeeting,
  getAllMeetings,
  getMeetingById,
  getMeetingByCode,
  getHostMeetings,
  getParticipantMeetings,
  updateMeeting,
  deleteMeeting,
  joinMeeting,
  leaveMeeting,
  startMeeting,
  endMeeting,
} from "../controllers/meetingController.js";

// Middleware
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

// Validators
import {
  createMeetingValidation,
  updateMeetingValidation,
  meetingIdValidation,
  meetingCodeValidation,
} from "../validators/meetingValidator.js";

const router = express.Router();


router.post(
  "/",
  protect,
  createMeetingValidation,
  createMeeting
);

router.get(
  "/",
  protect,
  getAllMeetings
);

router.get(
  "/my-hosted",
  protect,
  getHostMeetings
);

router.get(
  "/my-joined",
  protect,
  getParticipantMeetings
);

router.get(
  "/code/:meetingCode",
  protect,
  meetingCodeValidation,
  getMeetingByCode
);

router.get(
  "/:id",
  protect,
  meetingIdValidation,
  getMeetingById
);

router.put(
  "/:id",
  protect,
  meetingIdValidation,
  updateMeetingValidation,
  updateMeeting
);

router.delete(
  "/:id",
  protect,
  meetingIdValidation,
  deleteMeeting
);


router.post(
  "/:id/join",
  protect,
  meetingIdValidation,
  joinMeeting
);

router.post(
  "/:id/leave",
  protect,
  meetingIdValidation,
  leaveMeeting
);

router.patch(
  "/:id/start",
  protect,
  meetingIdValidation,
  startMeeting
);

router.patch(
  "/:id/end",
  protect,
  meetingIdValidation,
  endMeeting
);


router.get(
  "/admin/all",
  protect,
  authorize("admin"),
  getAllMeetings
);

export default router;