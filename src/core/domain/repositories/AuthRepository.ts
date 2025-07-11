/**
 * Interfaz para las operaciones relacionadas con la autenticación de usuarios.
 *
 * @interface AuthRepository
 */

import { AuthCredentials } from "../dto/auth/AuthCredentials";
import { RegisterUserDto } from "../dto/register/RegisterUserDto";
import { User } from "../model/User";

/**
 * Autentica a un usuario con el correo electrónico y la contraseña proporcionados.
 *
 * @param email - Dirección de correo electrónico del usuario.
 * @param password - Contraseña del usuario.
 * @returns Una promesa que resuelve al {@link User} autenticado.
 */

/**
 * Registra un nuevo usuario con el correo electrónico y la contraseña proporcionados.
 *
 * @param email - Dirección de correo electrónico del usuario.
 * @param password - Contraseña del usuario.
 * @returns Una promesa que resuelve al nuevo {@link User} creado.
 */

export interface AuthRepository {
    login(credentials: AuthCredentials): Promise<User>;
    register(user: RegisterUserDto): Promise<User>;
}

//cómo hacerlo  (abstrae la capa de datos y proporciona una manera de realizar operaciones  )