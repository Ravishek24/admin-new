import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useSocket = (url, roomName) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem('token')
    const socket = io(url, {
      transports: ['websocket'],
      auth:{token}
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Connected to socket:', socket.id);
      setConnected(true);

      // Join the specified room
      socket.emit('join-room', roomName); // Make sure your server is listening for 'join-room'
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from socket');
      setConnected(false);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, roomName]);

  return { socket: socketRef.current, connected };
};
