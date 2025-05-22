import { AuthRepository } from "../../../../core/domain/repositories/AuthRepository";
import { User } from "../../../../core/domain/model/User";
import axios from "axios";
import { AuthCredentials } from "@/src/core/domain/model/auth/AuthCredentials";
import { jwtDecode } from "jwt-decode";


export class AuthRepositoryImpl implements AuthRepository {

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


    // Decodificar token para obtener el role
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
      role, // asignado desde el token
      token: data.token,
      address: data.user.direccion || '',
      phone: data.user.telefono || '',
    };

    return user;
  }


  async register(user: User & { password: string }): Promise<void> {
    const payload = {
      username: user.username,
      nombre: user.name,
      email: user.email,
      password: user.password,
    };
    await axios.post("https://localhost:8000/api/auth/register", { payload });
  }
}