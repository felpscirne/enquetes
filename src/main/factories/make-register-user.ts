import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { RegisterUserUseCase } from '@/application/use-cases/register-user.use-case';
import { RegisterUserController } from '@/interface/controllers/register-user.controller';

export function makeRegisterUserController() {
  const userRepository = new PrismaUserRepository();
  const encrypter = new BcryptAdapter(10);
  const useCase = new RegisterUserUseCase(userRepository, encrypter);
  return new RegisterUserController(useCase);
}