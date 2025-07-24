import { AuthRepository } from "../../../../core/domain/repositories/AuthRepository";
import { User } from "../../../../core/domain/model/User";
import axios from "axios";
import { AuthCredentials } from "@/src/core/domain/dto/auth/AuthCredentials";
import { jwtDecode } from "jwt-decode";
import { RegisterUserDto } from "@/src/core/domain/dto/register/RegisterUserDto";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Implementación concreta del repositorio de autenticación (`AuthRepository`)
 * que utiliza llamadas HTTP (mediante axios) para comunicarse con un backend.
 */
const urlApi = 'http://192.168.197.253:8001/api';
export class AuthRepositoryImpl implements AuthRepository {

  async login(credentials: AuthCredentials): Promise<User> {
    console.debug("Iniciando proceso de login con credenciales:", credentials);

    const response = await axios.post(`${urlApi}/auth/login`, credentials);
    console.debug("Respuesta recibida del backend:", response.data);

    const data = response.data as {
      user: {
        id: string;
        username: string;
        email: string;
        nombre: string;
        direccion?: string;
        telefono?: string;
      };
      token: string;
    };

    // Guardar el token en AsyncStorage
    try {
      await AsyncStorage.setItem("auth_token", data.token);
      console.debug("Token guardado en AsyncStorage.");
    } catch (error) {
      console.error("Error al guardar el token en AsyncStorage:", error);
    }

    // Decodificar token JWT para obtener el rol del usuario
    let role: 'admin' | 'user' | undefined = undefined;
    try {
      const decodedToken: any = jwtDecode(data.token);
      console.debug("Token decodificado:", decodedToken);

      if (decodedToken.role === 'admin' || decodedToken.role === 'user') {
        role = decodedToken.role;
        console.debug("Rol extraído del token:", role);
      } else {
        console.warn("Rol no reconocido en el token:", decodedToken.role);
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
    }

    const user: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      name: data.user.nombre,
      role: role || 'user',
      token: data.token,
      address: data.user.direccion || '',
      phone: data.user.telefono || '',
    };

    console.info("Usuario autenticado correctamente:", user);
    return user;
  }

  async register(userData: RegisterUserDto): Promise<User> {
    console.debug("Enviando datos para registro de usuario:", userData);

    const response = await axios.post(`${urlApi}/auth/signup`, userData);

    console.debug("Respuesta del registro:", response.data);

    return response.data as User;
  }
}
