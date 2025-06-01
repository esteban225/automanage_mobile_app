/**
 * DTO para el registro de un nuevo usuario.
 * 
 * @property {string} name - Nombre completo del usuario.
 * @property {string} username - Nombre de usuario único.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 */

export interface RegisterUserDto {
    nombre: string;
    username: string;
    email: string;
    password: string;
}