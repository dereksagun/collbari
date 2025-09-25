import { io } from "socket.io-client";

export const socket = io({
  path: "/socket.io", // default, but explicit is safer
  transports: ["websocket"], // optional: helps avoid polling fallback
});


