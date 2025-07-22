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

  async login(credentials: AuthCredentials): Promise<User> {
    console.debug("Iniciando proceso de login con credenciales:", credentials);

    const response = await axios.post("http://192.168.1.9:8001/api/auth/login", credentials);
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
      role: role || 'user', // Asignar 'user' por defecto si no se encuentra rol
      token: data.token,
      address: data.user.direccion || '',
      phone: data.user.telefono || '',
    };

    console.info("Usuario autenticado correctamente:", user);
    return user;
  }

  async register(userData: RegisterUserDto): Promise<User> {
    console.debug("Enviando datos para registro de usuario:", userData);

    const response = await axios.post("http://192.168.1.9:8001/api/auth/signup", userData);

    console.debug("Respuesta del registro:", response.data);

    return response.data as User;
  }
}
