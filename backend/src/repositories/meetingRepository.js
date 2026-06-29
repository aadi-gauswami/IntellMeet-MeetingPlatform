import Meeting from "../models/Meeting.js";

export const createMeeting = async (meetingData) => {
  return await Meeting.create(meetingData);
};

export const findMeetingById = async (meetingId) => {
  return await Meeting.findById(meetingId)
    .populate("host", "name email avatar")
    .populate("participants.user", "name email avatar");
};

export const findMeetingByCode = async (meetingCode) => {
  return await Meeting.findOne({ meetingCode })
    .populate("host", "name email avatar")
    .populate("participants.user", "name email avatar");
};

export const getAllMeetings = async () => {
  return await Meeting.find()
    .populate("host", "name email avatar")
    .sort({ createdAt: -1 });
};

export const getMeetingsByHost = async (hostId) => {
  return await Meeting.find({ host: hostId })
    .populate("host", "name email avatar")
    .sort({ scheduledDate: 1 });
};

export const getMeetingsByParticipant = async (userId) => {
  return await Meeting.find({
    "participants.user": userId,
  })
    .populate("host", "name email avatar")
    .sort({ scheduledDate: 1 });
};

export const updateMeeting = async (meetingId, updateData) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  )
    .populate("host", "name email avatar")
    .populate("participants.user", "name email avatar");
};

export const deleteMeeting = async (meetingId) => {
  return await Meeting.findByIdAndDelete(meetingId);
};

export const joinMeeting = async (meetingId, participant) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      $push: {
        participants: participant,
      },
      $inc: {
        totalParticipants: 1,
      },
    },
    {
      new: true,
    }
  );
};

export const leaveMeeting = async (meetingId, userId) => {
  return await Meeting.findOneAndUpdate(
    {
      _id: meetingId,
      "participants.user": userId,
    },
    {
      $pull: {
        participants: {
          user: userId,
        },
      },
      $inc: {
        totalParticipants: -1,
      },
    },
    {
      new: true,
    }
  );
};

export const updateMeetingStatus = async (
  meetingId,
  status
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      status,
    },
    {
      new: true,
    }
  );
};

export const updateAISummary = async (
  meetingId,
  summary
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      aiSummary: summary,
    },
    {
      new: true,
    }
  );
};

export const updateTranscript = async (
  meetingId,
  transcript
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      transcript,
    },
    {
      new: true,
    }
  );
};

export const addActionItem = async (
  meetingId,
  actionItem
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      $push: {
        actionItems: actionItem,
      },
    },
    {
      new: true,
    }
  );
};

export const updateRecordingUrl = async (
  meetingId,
  recordingUrl
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      recordingUrl,
    },
    {
      new: true,
    }
  );
};

export const countMeetings = async () => {
  return await Meeting.countDocuments();
};

export const getLiveMeetings = async () => {
  return await Meeting.find({
    status: "live",
  }).populate("host", "name email");
};

export const saveMeeting = async (meeting) => {
  return await meeting.save();
};