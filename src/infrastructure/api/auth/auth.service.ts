import axios from 'axios';
import { User, AuthCredentials } from '../../../core/domain/model/User';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

interface JWTPayload {
  role: string;
}

export class AuthService {
  // Cambia esto a la URL de tu API
  // Asegúrate de que la URL sea accesible desde tu aplicación
  //192.168.76.253
  private readonly baseUrl = 'http://localhost:8000/api/auth'; // Cambia esto a la URL de tu API

  async login(credentials: AuthCredentials): Promise<User> {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, credentials);

      const { token } = response.data as {
        role: string;
        token: string;
      };

      await AsyncStorage.setItem('userToken', token);
      const payload = jwtDecode<JWTPayload>(token);

      const user: User = {
        id: '',
        direccion: '',
        role: payload.role as 'admin' | 'user',
        telefono: '',
        email: '',
        nombre: '',
        token: token,
        username: '',
      };

      return user;
    } catch (error: any) {
      return Promise.reject(
        new Error(error.response?.data?.message || 'Error de autenticación')
      );
    }
  }

  async signup(credentials: AuthCredentials): Promise<User> {
    try {
      const response = await axios.post(`${this.baseUrl}/signup`, credentials);
      return response.data as User;

    } catch (error: any) {
      if (error.response) {
        const data = error.response.data;
        if (data.errors) {
          const messages = Object.values(data.errors).flat().join('\n');
          return Promise.reject(new Error(messages));
        }
        return Promise.reject(new Error(data.message || 'Error del servidor'));
      } else if (error.request) {
        return Promise.reject(new Error('No se pudo conectar con el servidor'));
      } else {
        return Promise.reject(new Error('Error inesperado'));
      }
    }
  }


  async logout(): Promise<void> {
    await AsyncStorage.removeItem('userToken');
  }
}