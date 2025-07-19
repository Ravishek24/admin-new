// src/utils/axios.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.strikecolor1.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
