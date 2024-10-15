import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const { vueApp } = nuxtApp;

  // create socket instance
  const socket = io('https://server.freundify.com', {
    path: '/api/local/v1/socket.io',
  });

  socket.on('connect', () => {
    console.log('Connected to the server (socket io)');
  });

  return {
    provide: {
      socketio: socket,
    },
  };
});