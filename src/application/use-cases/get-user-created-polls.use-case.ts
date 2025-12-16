import { IPollRepository } from '../../domain/repositories/poll-repository.interface';

export class GetUserCreatedPollsUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute(userId: string) {
    return await this.pollRepository.findCreatedBy(userId);
  }
}