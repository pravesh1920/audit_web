import { io } from "socket.io-client";
import {GLOBAL_URL} from './constants'
export const socket = io.connect(GLOBAL_URL, {
  transports: ["websocket"], // forces websocket only
});

socket.on("connect", () => {
  console.log(`Socket Connected`);
});

socket.on("disconnect", () => {
  console.log(`Socket disConnected`);
});
socket.io.on("error", (error) => {
  console.log(`Socket Error`, error);
});

