import asyncHandler from "../utils/asyncHandler.js";

import {
  createMeetingService,
  getAllMeetingsService,
  getMeetingByIdService,
  getMeetingByCodeService,
  getHostMeetingsService,
  getParticipantMeetingsService,
  updateMeetingService,
  deleteMeetingService,
  joinMeetingService,
  leaveMeetingService,
  startMeetingService,
  endMeetingService,
} from "../services/meetingService.js";

/** @route POST /api/v1/meetings */
export const createMeeting = asyncHandler(async (req, res) => {
  const meeting = await createMeetingService(req.body, req.user.id);

  res.status(201).json({
    success: true,
    message: "Meeting created successfully",
    data: meeting,
  });
});

/** @route GET /api/v1/meetings  */
export const getAllMeetings = asyncHandler(async (req, res) => {
  const meetings = await getAllMeetingsService();

  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
});

/** @route GET /api/v1/meetings/:id  */
export const getMeetingById = asyncHandler(async (req, res) => {
  const meeting = await getMeetingByIdService(req.params.id);

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

/** @route GET /api/v1/meetings/code/:meetingCode */
export const getMeetingByCode = asyncHandler(async (req, res) => {
  const meeting = await getMeetingByCodeService(req.params.meetingCode);

  res.status(200).json({
    success: true,
    data: meeting,
  });
});

/** @route GET /api/v1/meetings/my-hosted */
export const getHostMeetings = asyncHandler(async (req, res) => {
  const meetings = await getHostMeetingsService(req.user.id);

  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
});

/** @route GET /api/v1/meetings/my-joined */
export const getParticipantMeetings = asyncHandler(async (req, res) => {
  const meetings = await getParticipantMeetingsService(req.user.id);

  res.status(200).json({
    success: true,
    count: meetings.length,
    data: meetings,
  });
});

/** @route PUT /api/v1/meetings/:id */
export const updateMeeting = asyncHandler(async (req, res) => {
  const meeting = await updateMeetingService(
    req.params.id,
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Meeting updated successfully",
    data: meeting,
  });
});

/** @route DELETE /api/v1/meetings/:id */
export const deleteMeeting = asyncHandler(async (req, res) => {
  const response = await deleteMeetingService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: response.message,
  });
});

/** @route POST /api/v1/meetings/:id/join */
export const joinMeeting = asyncHandler(async (req, res) => {
  const meeting = await joinMeetingService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Joined meeting successfully",
    data: meeting,
  });
});

/** @route POST /api/v1/meetings/:id/leave */
export const leaveMeeting = asyncHandler(async (req, res) => {
  const meeting = await leaveMeetingService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Left meeting successfully",
    data: meeting,
  });
});

/** @route PATCH /api/v1/meetings/:id/start */
export const startMeeting = asyncHandler(async (req, res) => {
  const meeting = await startMeetingService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Meeting started successfully",
    data: meeting,
  });
});

/** @route PATCH /api/v1/meetings/:id/end */
export const endMeeting = asyncHandler(async (req, res) => {
  const meeting = await endMeetingService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    message: "Meeting ended successfully",
    data: meeting,
  });
});