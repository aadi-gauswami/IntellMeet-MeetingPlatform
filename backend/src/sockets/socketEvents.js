export const EVENTS = {

  CONNECTION: {
    CONNECT: "connection",
    DISCONNECT: "disconnect",
    ERROR: "error",
  },

  AUTH: {
    AUTHENTICATED: "authenticated",
    UNAUTHORIZED: "unauthorized",
  },

  MEETING: {
    JOIN_ROOM: "join-room",
    LEAVE_ROOM: "leave-room",

    PARTICIPANT_JOINED: "participant-joined",
    PARTICIPANT_LEFT: "participant-left",

    MEETING_STARTED: "meeting-started",
    MEETING_ENDED: "meeting-ended",

    HOST_JOINED: "host-joined",
    HOST_LEFT: "host-left",
  },

  CHAT: {
    SEND_MESSAGE: "send-message",
    RECEIVE_MESSAGE: "receive-message",

    EDIT_MESSAGE: "edit-message",
    DELETE_MESSAGE: "delete-message",

    TYPING: "typing",
    STOP_TYPING: "stop-typing",

    MESSAGE_READ: "message-read",

    ADD_REACTION: "add-reaction",
    REMOVE_REACTION: "remove-reaction",

    PIN_MESSAGE: "pin-message",
    UNPIN_MESSAGE: "unpin-message",
  },

  SIGNALING: {
    OFFER: "offer",
    ANSWER: "answer",
    ICE_CANDIDATE: "ice-candidate",

    PEER_JOINED: "peer-joined",
    PEER_LEFT: "peer-left",

    READY: "ready"
},

  MEDIA: {
    AUDIO_ON: "audio-on",
    AUDIO_OFF: "audio-off",

    VIDEO_ON: "video-on",
    VIDEO_OFF: "video-off",

    MUTE_USER: "mute-user",
    UNMUTE_USER: "unmute-user",

    CAMERA_ON: "camera-on",
    CAMERA_OFF: "camera-off"
  },

  SCREEN: {
    START: "screen-share-start",
    STOP: "screen-share-stop",
    PRESENTING: "screen-presenting",
    PRESENTER_CHANGED: "presenter-changed"
},

  RECORDING: {
    START: "recording-start",
    STOP: "recording-stop",
    PAUSE: "recording-pause",
    RESUME: "recording-resume",
    STATUS: "recording-status"
  },

  PRESENCE: {
    USER_ONLINE: "user-online",
    USER_OFFLINE: "user-offline",

    RAISE_HAND: "raise-hand",
    LOWER_HAND: "lower-hand",
  },

  AI: {
    TRANSCRIPT_UPDATE: "transcript-update",
    SUMMARY_READY: "summary-ready",
    ACTION_ITEM_CREATED: "action-item-created",
  },

  NOTIFICATION: {
    NEW_NOTIFICATION: "new-notification",
  },

  ERROR: {
    CHAT_ERROR: "chat-error"
  },
};

export default EVENTS;