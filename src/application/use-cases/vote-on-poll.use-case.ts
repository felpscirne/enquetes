import { IPollRepository } from '@/domain/repositories/poll-repository.interface';
import { IVoteRepository } from '@/domain/repositories/vote-repository.interface';

interface VoteRequest {
  pollId: string;
  pollOptionId: string;
  userId: string;
}

export class VoteOnPollUseCase {
  constructor(
    private pollRepository: IPollRepository,
    private voteRepository: IVoteRepository
  ) {}

  async execute({ pollId, pollOptionId, userId }: VoteRequest) {
    const poll = await this.pollRepository.getDetails(pollId);

    if (!poll) throw new Error('Poll not found');

    if (poll.status === 'CLOSED') throw new Error('Poll is closed');

    if (poll.endAt && new Date() > new Date(poll.endAt)) {
      await this.pollRepository.update(pollId, { status: 'CLOSED' });
      throw new Error('Poll expired');
    }

    const optionExists = poll.options.find((opt) => opt.id === pollOptionId);
    if (!optionExists) throw new Error('Invalid option for this poll');

    const currentTotalVotes = poll.options.reduce((acc, opt) => acc + opt.score, 0);

    if (poll.expectedVotes && currentTotalVotes >= poll.expectedVotes) {
      await this.pollRepository.update(pollId, { status: 'CLOSED' });
      throw new Error('Poll reached maximum votes');
    }

    const vote = await this.voteRepository.create({
      pollId,
      pollOptionId,
      userId,
    });

    if (poll.expectedVotes) {
      const newTotal = currentTotalVotes + 1;
      if (newTotal >= poll.expectedVotes) {
        await this.pollRepository.update(pollId, { status: 'CLOSED' });
      }
    }

    return vote;
  }
}