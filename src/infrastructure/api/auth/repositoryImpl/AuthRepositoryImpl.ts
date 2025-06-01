import { AuthRepository } from "../../../../core/domain/repositories/AuthRepository";
import { User } from "../../../../core/domain/model/User";
import axios from "axios";
import { AuthCredentials } from "@/src/core/domain/dto/auth/AuthCredentials";
import { jwtDecode } from "jwt-decode";
import { RegisterUserDto } from "@/src/core/domain/dto/register/RegisterUserDto";

/**
 * Implementación concreta del repositorio de autenticación (`AuthRepository`)
 * que utiliza llamadas HTTP (mediante axios) para comunicarse con un backend.
 */
export class AuthRepositoryImpl implements AuthRepository {

  /**
   * Inicia sesión de un usuario autenticándolo con el backend.
   * 
   * @param {AuthCredentials} credentials - Objeto con las credenciales del usuario (email y contraseña).
   * 
   * @returns {Promise<User>} - Promesa que se resuelve con el usuario autenticado y su token.
   * 
   * @throws {Error} - Puede lanzar errores si la petición HTTP falla o si el token no es válido.
   */
  async login(credentials: AuthCredentials): Promise<User> {
    const response = await axios.post("http://localhost:8000/api/auth/login", credentials);

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

    // Decodificar token JWT para obtener el rol del usuario
    let role: 'admin' | 'user' = 'user';
    try {
      const decodedToken: any = jwtDecode(data.token);
      if (decodedToken.role === 'admin' || decodedToken.role === 'user') {
        role = decodedToken.role;
      }
    } catch (error) {
      console.warn("No se pudo decodificar el token:", error);
    }

    const user: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      name: data.user.nombre,
      role, // Asignado desde el token decodificado
      token: data.token,
      address: data.user.direccion || '',
      phone: data.user.telefono || '',
    };

    return user;
  }

  /**
   * Registra un nuevo usuario enviando sus datos al backend.
   * 
   * @param {User & { password: string }} user - Objeto que contiene los datos del usuario y su contraseña.
   * 
   * @returns {Promise<void>} - Promesa que se resuelve cuando el usuario ha sido registrado exitosamente.
   */
  async register(userData: RegisterUserDto): Promise<User> {
    const response = await axios.post("http://localhost:8000/api/auth/signup", userData); // Enviar userData directamente
    return response.data as User; // Asumiendo que el backend retorna el User creado
  }
}
