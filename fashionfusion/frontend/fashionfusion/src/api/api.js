// src/api/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token only if not calling login or signup
api.interceptors.request.use(
  (config) => {
    const isPublic =
      config.url.includes('/auth/signup') ||
      config.url.includes('/auth/seller-signup') ||
      config.url.includes('/auth/login');

    const token = localStorage.getItem('token');
    console.log("Token:", token);

    if (token && !isPublic) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log(`Bearer ${token}`);

    }

    return config;
  },
  (error) => Promise.reject(error)
);


export default api;
