import { AuthCredentials } from "../../domain/dto/auth/AuthCredentials";
import { User } from "../../domain/model/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

/**
 * Caso de uso para iniciar sesión de un usuario.
 * 
 * Este caso de uso recibe las credenciales del usuario (email y contraseña),
 * las valida y delega la autenticación al repositorio correspondiente.
 * 
 * @param {string} email - Correo electrónico del usuario.
 * @param {string} password - Contraseña del usuario.
 * @param {AuthRepository} repository - Repositorio de autenticación que se encargará de validar las credenciales.
 * 
 * @returns {Promise<User>} - Retorna una promesa que se resuelve con el objeto `User` autenticado.
 * 
 * @throws {Error} - Lanza un error si el email o la contraseña no son proporcionados.
 */
export const loginUserUseCase = async (
  email: string,
  password: string,
  repository: AuthRepository
): Promise<User> => {
  if (!email || !password) {
    throw new Error("Email y contraseña son obligatorios.");
  }

  const credentials: AuthCredentials = { email, password };
  return await repository.login(credentials);
};
