import EVENTS from "./socketEvents.js";

import {
  sendMessageService,
  editMessageService,
  deleteMessageService,
  addReactionService,
  removeReactionService,
  markAsReadService,
  pinMessageService,
  unpinMessageService,
} from "../services/chatService.js";

const registerChatSocket = (io, socket) => {


  socket.on(EVENTS.CHAT.SEND_MESSAGE, async (payload) => {
    try {

      const {
        meetingId,
        message,
        messageType,
        attachments,
        replyTo,
      } = payload;

      const savedMessage = await sendMessageService(
        meetingId,
        socket.user._id,
        {
          message,
          messageType,
          attachments,
          replyTo,
        }
      );

      io.to(meetingId).emit(
        EVENTS.CHAT.RECEIVE_MESSAGE,
        savedMessage
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }
  });

  //Typing Indicator
  socket.on(EVENTS.CHAT.TYPING, ({ meetingId }) => {

    socket.to(meetingId).emit(
      EVENTS.CHAT.TYPING,
      {
        userId: socket.user._id,
        name: socket.user.name,
      }
    );

  });

  socket.on(EVENTS.CHAT.STOP_TYPING, ({ meetingId }) => {

    socket.to(meetingId).emit(
      EVENTS.CHAT.STOP_TYPING,
      {
        userId: socket.user._id,
      }
    );

  });


  socket.on(EVENTS.CHAT.EDIT_MESSAGE, async (payload) => {

    try {

      const updatedMessage = await editMessageService(
        payload.messageId,
        socket.user._id,
        payload.message
      );

      io.to(updatedMessage.meeting).emit(
        EVENTS.CHAT.EDIT_MESSAGE,
        updatedMessage
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });


  socket.on(EVENTS.CHAT.DELETE_MESSAGE, async ({ messageId }) => {

    try {

      const deletedMessage = await deleteMessageService(
        messageId,
        socket.user._id
      );

      io.to(deletedMessage.meeting).emit(
        EVENTS.CHAT.DELETE_MESSAGE,
        deletedMessage
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });


  socket.on(EVENTS.CHAT.ADD_REACTION, async (payload) => {

    try {

      const updated = await addReactionService(
        payload.messageId,
        socket.user._id,
        payload.emoji
      );

      io.to(updated.meeting).emit(
        EVENTS.CHAT.ADD_REACTION,
        updated
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });

  
  socket.on(EVENTS.CHAT.REMOVE_REACTION, async (payload) => {

    try {

      const updated = await removeReactionService(
        payload.messageId,
        socket.user._id,
        payload.emoji
      );

      io.to(updated.meeting).emit(
        EVENTS.CHAT.REMOVE_REACTION,
        updated
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });

  
  socket.on(EVENTS.CHAT.MESSAGE_READ, async ({ messageId }) => {

    try {

      const updated = await markAsReadService(
        messageId,
        socket.user._id
      );

      io.to(updated.meeting).emit(
        EVENTS.CHAT.MESSAGE_READ,
        updated
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });

  
  socket.on(EVENTS.CHAT.PIN_MESSAGE, async ({ messageId }) => {

    try {

      const updated = await pinMessageService(
        messageId,
        socket.user._id
      );

      io.to(updated.meeting).emit(
        EVENTS.CHAT.PIN_MESSAGE,
        updated
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });


  socket.on(EVENTS.CHAT.UNPIN_MESSAGE, async ({ messageId }) => {

    try {

      const updated = await unpinMessageService(messageId);

      io.to(updated.meeting).emit(
        EVENTS.CHAT.UNPIN_MESSAGE,
        updated
      );

    } catch (error) {

      socket.emit(EVENTS.ERROR.CHAT_ERROR, {
        message: error.message,
      });

    }

  });

};

export default registerChatSocket;