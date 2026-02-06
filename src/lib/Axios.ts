import axios from 'axios';

import { env } from '@/env';
import { getSocketId } from '@/services/socket-session';

export const api = axios.create({
  baseURL: env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const socketId = getSocketId();

  if (socketId) {
    config.headers['Wspm-Id'] = socketId;
  }

  console.log('SOCKET CARAIO');
  console.log(socketId);

  return config;
});
