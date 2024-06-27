import { SocketClientEvents } from "../enums";
import { socket } from "../socket";

/**
 *
 * @param {string} data - The data from the Unity game, format JSON
 */
export function updateDataDev(data: string) {
  console.log("updateDataDev", data);
  socket.emit(SocketClientEvents.UpdateDataDev, JSON.parse(data)); // Send data to the server
}
