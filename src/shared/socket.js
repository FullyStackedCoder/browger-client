import openSocket from "socket.io-client";

let io;

export const socket = {
  init: () => {
    io = openSocket("http://localhost:8080");
    return io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io is not initialized");
    }
    return io;
  }
};
