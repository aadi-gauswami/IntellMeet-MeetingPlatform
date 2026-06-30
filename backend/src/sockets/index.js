import registerMeetingSocket from "./meetingSocket.js";
import registerChatSocket from "./chatSocket.js";
import registerPresenceSocket from "./presenceSocket.js";
import registerSignalingSocket from "./signalingSocket.js";
import registerScreenShareSocket from "./screenShareSocket.js";
import registerRecordingSocket from "./recordingSocket.js";

const registerSocketHandlers = (io, socket) => {

  registerMeetingSocket(io, socket);

  registerChatSocket(io, socket);

  registerPresenceSocket(io, socket);

  registerSignalingSocket(io, socket);

  registerScreenShareSocket(io, socket);

  registerRecordingSocket(io, socket);

};

export default registerSocketHandlers;