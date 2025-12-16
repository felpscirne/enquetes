import { PrismaUserRepository } from '@/infra/database/prisma/repositories/prisma-user-repository';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter';
import { JwtAdapter } from '@/infra/cryptography/jwt-adapter';
import { AuthenticateUserUseCase } from '@/application/use-cases/authenticate-user.use-case';
import { AuthenticateUserController } from '@/interface/controllers/authenticate-user.controller';

export function makeAuthenticateUserController() {
  const userRepository = new PrismaUserRepository();
  const encrypter = new BcryptAdapter(10);
  const tokenGenerator = new JwtAdapter(process.env.JWT_SECRET || 'segredo_padrao');

  const useCase = new AuthenticateUserUseCase(userRepository, encrypter, tokenGenerator);

  return new AuthenticateUserController(useCase);
}