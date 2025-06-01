/**
 * Representa las credenciales de autenticación de un usuario.
 *
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} password - Contraseña del usuario.
 */
export interface AuthCredentials {
  email: string;
  password: string;
}