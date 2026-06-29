import {
  createMeeting,
  findMeetingById,
  findMeetingByCode,
  getAllMeetings,
  getMeetingsByHost,
  getMeetingsByParticipant,
  updateMeeting,
  deleteMeeting,
  joinMeeting,
  leaveMeeting,
  updateMeetingStatus,
} from "../repositories/meetingRepository.js";

export const createMeetingService = async (meetingData, hostId) => {
  const meeting = await createMeeting({
    ...meetingData,
    host: hostId,
  });

  return meeting;
};

export const getAllMeetingsService = async () => {
  return await getAllMeetings();
};

export const getMeetingByIdService = async (meetingId) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return meeting;
};

export const getMeetingByCodeService = async (meetingCode) => {
  const meeting = await findMeetingByCode(meetingCode);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return meeting;
};

export const getHostMeetingsService = async (hostId) => {
  return await getMeetingsByHost(hostId);
};

export const getParticipantMeetingsService = async (userId) => {
  return await getMeetingsByParticipant(userId);
};

export const updateMeetingService = async (
  meetingId,
  userId,
  updateData
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  if (meeting.host._id.toString() !== userId.toString()) {
    throw new Error("Only host can update this meeting");
  }

  return await updateMeeting(meetingId, updateData);
};

export const deleteMeetingService = async (
  meetingId,
  userId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  if (meeting.host._id.toString() !== userId.toString()) {
    throw new Error("Only host can delete this meeting");
  }

  await deleteMeeting(meetingId);

  return {
    message: "Meeting deleted successfully",
  };
};

export const joinMeetingService = async (
  meetingId,
  userId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  if (meeting.status === "completed") {
    throw new Error("Meeting has already ended");
  }

  const alreadyJoined = meeting.participants.some(
    (participant) =>
      participant.user &&
      participant.user._id.toString() === userId.toString()
  );

  if (alreadyJoined) {
    throw new Error("You have already joined this meeting");
  }

  const participant = {
    user: userId,
    joinedAt: new Date(),
    role: "participant",
  };

  return await joinMeeting(meetingId, participant);
};

export const leaveMeetingService = async (
  meetingId,
  userId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  return await leaveMeeting(meetingId, userId);
};

export const startMeetingService = async (
  meetingId,
  userId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  if (meeting.host._id.toString() !== userId.toString()) {
    throw new Error("Only host can start meeting");
  }

  return await updateMeetingStatus(
    meetingId,
    "live"
  );
};

export const endMeetingService = async (
  meetingId,
  userId
) => {
  const meeting = await findMeetingById(meetingId);

  if (!meeting) {
    throw new Error("Meeting not found");
  }

  if (meeting.host._id.toString() !== userId.toString()) {
    throw new Error("Only host can end meeting");
  }

  return await updateMeetingStatus(
    meetingId,
    "completed"
  );
};