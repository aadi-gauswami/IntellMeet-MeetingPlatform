import EVENTS from "./socketEvents.js";

const registerPresenceSocket = (io, socket) => {

  
  socket.on(EVENTS.PRESENCE.USER_ONLINE, ({ meetingId }) => {

    socket.to(meetingId).emit(
      EVENTS.PRESENCE.USER_ONLINE,
      {
        userId: socket.user._id,
        name: socket.user.name,
      }
    );

  });

  socket.on(EVENTS.PRESENCE.USER_OFFLINE, ({ meetingId }) => {

    socket.to(meetingId).emit(
      EVENTS.PRESENCE.USER_OFFLINE,
      {
        userId: socket.user._id,
      }
    );

  });

  socket.on(EVENTS.PRESENCE.RAISE_HAND, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.PRESENCE.RAISE_HAND,
      {
        userId: socket.user._id,
        name: socket.user.name,
      }
    );

  });

  socket.on(EVENTS.PRESENCE.LOWER_HAND, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.PRESENCE.LOWER_HAND,
      {
        userId: socket.user._id,
      }
    );

  });

  socket.on(EVENTS.MEDIA.MUTE_USER, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.MEDIA.MUTE_USER,
      {
        userId: socket.user._id,
      }
    );

  });

  socket.on(EVENTS.MEDIA.UNMUTE_USER, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.MEDIA.UNMUTE_USER,
      {
        userId: socket.user._id,
      }
    );

  });

  socket.on(EVENTS.MEDIA.CAMERA_ON, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.MEDIA.CAMERA_ON,
      {
        userId: socket.user._id,
      }
    );

  });

  socket.on(EVENTS.MEDIA.CAMERA_OFF, ({ meetingId }) => {

    io.to(meetingId).emit(
      EVENTS.MEDIA.CAMERA_OFF,
      {
        userId: socket.user._id,
      }
    );

  });

};

export default registerPresenceSocket;