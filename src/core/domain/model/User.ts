/**
 * Representa un usuario dentro de la aplicación.
 *
 * @property id - Identificador único del usuario.
 * @property direccion - Dirección física del usuario.
 * @property telefono - Número de teléfono del usuario.
 * @property email - Correo electrónico del usuario.
 * @property nombre - Nombre completo del usuario.
 * @property token - Token de autenticación asociado al usuario.
 * @property username - Nombre de usuario utilizado para iniciar sesión.
 * @property password - Contraseña del usuario.
 * @property role - Rol asignado al usuario, puede ser 'admin' o 'user'.
 */

export interface User {
  id: string;
  address: string;
  phone: string;
  email: string;
  name: string;
  username: string;
  role: 'admin' | 'user';
  token?: string; // opcional, solo después del login
}