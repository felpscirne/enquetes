import { IUserRepository } from '@/domain/repositories/user-repository.interface';
import { IEncrypter } from '@/application/services/encrypter.interface';

interface RegisterUserRequest {
  name: string;
  email: string;
  password: string;
}

interface RegisterUserResponse {
  id: string;
  name: string;
  email: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private encrypter: IEncrypter
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userExists = await this.userRepository.findByEmail(request.email);

    if (userExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await this.encrypter.hash(request.password);

    const user = await this.userRepository.create({
      name: request.name,
      email: request.email,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}