
/**
 * Caso de uso para registrar un nuevo usuario.
 * 
 * Esta clase utiliza un repositorio de autenticación para registrar un usuario
 * con un correo electrónico y una contraseña proporcionados.
 * 
 * @class
 */

/**
 * Crea una instancia de RegisterUserUseCase.
 * 
 * @param authRepository - Repositorio de autenticación que implementa AuthRepository.
 */

/**
 * Ejecuta el registro de un usuario.
 * 
 * Valida que el correo electrónico y la contraseña no estén vacíos.
 * Luego, llama al repositorio para registrar al usuario y retorna el usuario creado.
 * 
 * @param email - Correo electrónico del usuario a registrar.
 * @param password - Contraseña del usuario a registrar.
 * @returns Una promesa que resuelve con el usuario registrado.
 * @throws Error si el correo electrónico o la contraseña no son proporcionados.
 */

import { RegisterUserDto } from "../../domain/dto/register/RegisterUserDto";
import { User } from "../../domain/model/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

export const registerUserUseCase = async (
  credentials: RegisterUserDto,
  repository: AuthRepository
): Promise<User> => {

  if (!credentials.email || !credentials.password || !credentials.nombre || !credentials.username) {
    throw new Error("Todos los campos son obligatorios");
  }

  // puedes poner lógica adicional aquí (validaciones, logs, reglas, etc.)
  const user = await repository.register(credentials);
  return user;
};

//qué hacer (logica de negocio cordina la capa )