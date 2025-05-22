import { AuthCredentials } from "../../domain/model/auth/AuthCredentials";
import { User } from "../../domain/model/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

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