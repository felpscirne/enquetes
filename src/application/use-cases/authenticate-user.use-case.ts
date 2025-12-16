import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { IEncrypter } from '@/application/services/encrypter.interface';
import { ITokenGenerator } from '@/application/services/token-generator.interface';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
}

export class AuthenticateUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypter: IEncrypter,
    private tokenGenerator: ITokenGenerator
  ) {}

  async execute({ email, password }: AuthRequest): Promise<AuthResponse> {
    //busco o user
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // comparo a senha
    const isValidPassword = await this.encrypter.compare(password, user.password);

    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // gero o token
    const accessToken = this.tokenGenerator.generate(user.id.toString()); 

    return { accessToken };
  }
}