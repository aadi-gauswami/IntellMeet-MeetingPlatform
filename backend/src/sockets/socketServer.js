import { Server } from "socket.io";

import socketAuth from "./socketAuth.js";
import registerSocketHandlers from "./index.js";
import EVENTS from "./socketEvents.js";

let io;

export const initializeSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
      credentials: true,
    },

    transports: ["websocket", "polling"],
  });

  // Socket Authentication
  io.use(socketAuth);

  // Connection
  io.on(EVENTS.CONNECTION.CONNECT, (socket) => {
    console.log(
      `✅ User Connected: ${socket.user.name} (${socket.user._id})`
    );

    // Register all socket handlers
    registerSocketHandlers(io, socket);

    socket.on(EVENTS.CONNECTION.DISCONNECT, (reason) => {
      console.log(
        `❌ User Disconnected: ${socket.user.name}`
      );

      console.log("Reason:", reason);
    });
  });

  return io;
};

// Access Socket.IO instance anywhere
export const getIO = () => {
  if (!io) {
    throw new Error("Socket.IO has not been initialized.");
  }

  return io;
};