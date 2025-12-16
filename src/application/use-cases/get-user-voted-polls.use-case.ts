import { IVoteRepository } from '../../domain/repositories/vote-repository.interface';

export class GetUserVotedPollsUseCase {
  constructor(private voteRepository: IVoteRepository) {}

  async execute(userId: string) {
    return await this.voteRepository.findVotedBy(userId);
  }
}