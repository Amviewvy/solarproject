import { io, Socket } from 'socket.io-client';

// const SOCKET_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
const SOCKET_URL = 'https://exymc.eng.nu.ac.th';

export const socket: Socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: false,
});
