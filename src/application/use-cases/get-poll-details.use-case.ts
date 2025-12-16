import { IPollRepository } from '@/domain/repositories/poll-repository.interface';
import { IVoteRepository } from '@/domain/repositories/vote-repository.interface';
import { PollWithOptions } from '@/domain/repositories/poll-repository.interface';

interface GetPollDetailsRequest {
  pollId: string;
  userId?: string; 
}


interface GetPollDetailsResponse {
  poll: PollWithOptions;
  userVoted: boolean;
}

export class GetPollDetailsUseCase {
  constructor(
    private pollRepository: IPollRepository,
    private voteRepository: IVoteRepository,
  ) {}

  async execute({ pollId, userId }: GetPollDetailsRequest): Promise<GetPollDetailsResponse> {
    const poll = await this.pollRepository.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    let userVoted = false;

    // usuário está autenticado, verifica se ele votou
    if (userId) {
      userVoted = await this.voteRepository.hasUserVoted(pollId, userId);
    }

    return {
      poll, 
      userVoted,
    };
  }
}