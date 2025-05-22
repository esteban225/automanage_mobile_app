// Importación de React y hooks necesarios
import React, { createContext, useContext, useState } from "react";
// Importación del servicio de autenticación
// import { AuthService } from "../../infrastructure/api/auth/auth.service";
// Importación de los tipos de datos del dominio
import { User } from "../../core/domain/model/User";
import { AuthRepositoryImpl } from "@/src/infrastructure/api/auth/repositoryImpl/AuthRepositoryImpl";
import { loginUserUseCase } from "@/src/core/useCases/user/loginUserUseCase";
import { AuthCredentials } from "@/src/core/domain/model/auth/AuthCredentials";

/**
 * Interfaz que define la estructura del contexto de autenticación.
 */
interface AuthContextValue {
  user: User | null; // Usuario autenticado o null si no hay sesión
  login: (credentials: AuthCredentials) => Promise<void>; // Función para iniciar sesión
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  // logout: () => Promise<void>; // Función para cerrar sesión
  // signup: (credentials: User) => Promise<void>; //
}

/**
 * Creación del contexto de autenticación con valores iniciales vacíos.
 */
const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  setUser: () => {},
  // logout: async () => {},
  // signup: async () => {},
});

/**
 * Componente proveedor del contexto de autenticación.
 * Este componente debe envolver cualquier parte de la app que necesite acceso al estado de autenticación.
 *
 * @param children Elementos hijos que tendrán acceso al contexto.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Estado para almacenar el usuario autenticado
  const [user, setUser] = useState<User | null>(null);

  // Instancia del servicio de autenticación
  // const authService = new AuthService();

  /**
   * Función para iniciar sesión.
   * Llama al servicio de autenticación y actualiza el estado del usuario.
   *
   * @param credentials Credenciales de inicio de sesión (usuario y contraseña)
   */
  const login = async ({ email, password }: AuthCredentials) => {
    const repository = new AuthRepositoryImpl();
    const loggedUser = await loginUserUseCase(email, password, repository);
    setUser(loggedUser);
  };
  /**
   * Función para registrar un nuevo usuario.
   * Llama al servicio de registro y actualiza el estado del usuario.
   *
   * @param credentials Credenciales de registro (usuario, contraseña, etc.)
   */
  // const signup = async (credentials: User) => {
  //   console.log("signup provider", credentials);
  //   const user = await authService.signup(credentials);
  //   setUser(user);
  // };
  /**
   * Función para cerrar sesión.
   * Llama al servicio de logout y limpia el estado del usuario.
   */
  // const logout = async () => {
  //   await authService.logout();
  //   setUser(null);
  // };

  // Objeto que contiene los valores del contexto para ser compartidos
  const contextValue = React.useMemo<AuthContextValue>(
    () => ({ user, login, setUser }),
    [user, login, setUser]
  );

  /**
   * Proporciona el contexto de autenticación a los componentes hijos.
   */
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de autenticación de forma más sencilla.
 *
 * @throws Error si se usa fuera de un AuthProvider.
 * @returns El contexto de autenticación (usuario, login, logout)
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
