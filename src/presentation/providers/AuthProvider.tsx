import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../core/domain/model/User";
import { AuthRepositoryImpl } from "@/src/infrastructure/api/auth/repositoryImpl/AuthRepositoryImpl";
import { loginUserUseCase } from "@/src/core/useCases/user/loginUserUseCase";
import { AuthCredentials } from "@/src/core/domain/dto/auth/AuthCredentials";
import { registerUserUseCase } from "@/src/core/useCases/user/registerUserUseCase";
import { RegisterUserDto } from "@/src/core/domain/dto/register/RegisterUserDto";

// Interfaz que define el valor del contexto de autenticación
interface AuthContextValue {
  user: User | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: RegisterUserDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

// Se crea el contexto de autenticación con valores por defecto
const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  setUser: () => {},
  loading: true,
});

// Proveedor del contexto de autenticación
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde almacenamiento local al iniciar la app
  useEffect(() => {
    const loadUserFromStorage = async () => {
      console.log("[AuthProvider] Cargando usuario desde AsyncStorage...");
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          console.log("[AuthProvider] Usuario cargado:", parsedUser);
        } else {
          console.log("[AuthProvider] No se encontró usuario en AsyncStorage.");
        }
      } catch (error) {
        console.error("[AuthProvider] Error al cargar usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  // Iniciar sesión
  const login = async ({ email, password }: AuthCredentials) => {
    console.log("[AuthProvider] Intentando iniciar sesión con:", email);
    try {
      const repository = new AuthRepositoryImpl();
      const loggedUser = await loginUserUseCase(email, password, repository);
      setUser(loggedUser);
      await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
      console.log("[AuthProvider] Usuario autenticado correctamente:", loggedUser);
    } catch (error) {
      console.error("[AuthProvider] Error en login:", error);
      throw error;
    }
  };

  // Registrar usuario
  const register = async (credentials: RegisterUserDto) => {
    console.log("[AuthProvider] Intentando registrar usuario con:", credentials.email);
    try {
      const repository = new AuthRepositoryImpl();
      const registeredUser = await registerUserUseCase(credentials, repository);
      setUser(registeredUser);
      await AsyncStorage.setItem("user", JSON.stringify(registeredUser));
      console.log("[AuthProvider] Usuario registrado y autenticado:", registeredUser);
    } catch (error) {
      console.error("[AuthProvider] Error en register:", error);
      throw error;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    console.log("[AuthProvider] Cerrando sesión...");
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
      console.log("[AuthProvider] Usuario eliminado del almacenamiento.");
    } catch (error) {
      console.error("[AuthProvider] Error al cerrar sesión:", error);
    }
  };

  const contextValue = React.useMemo<AuthContextValue>(
    () => ({
      user,
      login,
      register,
      logout,
      setUser,
      loading,
    }),
    [user, login, register, logout, loading]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
