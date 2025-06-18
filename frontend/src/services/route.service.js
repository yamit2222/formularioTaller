import axios from 'axios';
import cookies from 'js-cookie';

// En desarrollo, usa el proxy de Vite (/api), en producción usa la URL completa
const API_URL = import.meta.env.DEV ? '/api' : (import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api');

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const token = cookies.get('jwt-auth', { path: '/' });
    if(token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuesta para manejar errores globalmente
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado o inválido
      cookies.remove('jwt-auth', { path: '/' });
      // Opcional: redirigir a login
    }
    return Promise.reject(error);
  }
);

export default instance;