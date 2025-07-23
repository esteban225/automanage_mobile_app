import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const api: AxiosInstance = axios.create({
  baseURL: 'http://192.168.100.7:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a las peticiones
api.interceptors.request.use(async (config: AxiosRequestConfig) => {
  try {
    const token = await SecureStore.getItemAsync('auth_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.error('Error al obtener el token:', error);
    return config;
  }
}, (error: AxiosError) => {
  return Promise.reject(error);
});

// Interceptor de respuesta
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Eliminar token inválido y redirigir
      await SecureStore.deleteItemAsync('auth_token');
      // Aquí puedes agregar tu lógica de redirección
      // Por ejemplo usando navigation.navigate('Login')
      router.replace('/(auth)/login');
    }
    return Promise.reject(error);
  }
);

export default api;