import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../../core/domain/model/User";
import { AuthRepositoryImpl } from "@/src/infrastructure/api/auth/repositoryImpl/AuthRepositoryImpl";
import { loginUserUseCase } from "@/src/core/useCases/user/loginUserUseCase";
import { AuthCredentials } from "@/src/core/domain/dto/auth/AuthCredentials";
import { registerUserUseCase } from "@/src/core/useCases/user/registerUserUseCase";
import { RegisterUserDto } from "@/src/core/domain/dto/register/RegisterUserDto";

interface AuthContextValue {
  user: User | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: RegisterUserDto) => Promise<void>;
  logout: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  login: async () => {},
  register: async () => {},
  logout: async () => {},
  setUser: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error al cargar usuario desde AsyncStorage", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserFromStorage();
  }, []);

  const login = async ({ email, password }: AuthCredentials) => {
    const repository = new AuthRepositoryImpl();
    const loggedUser = await loginUserUseCase(email, password, repository);
    setUser(loggedUser);
    await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
  };

  const register = async (credentials: RegisterUserDto) => {
    const repository = new AuthRepositoryImpl();
    const registeredUser = await registerUserUseCase(credentials, repository);
    setUser(registeredUser);
    await AsyncStorage.setItem("user", JSON.stringify(registeredUser));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
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

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
