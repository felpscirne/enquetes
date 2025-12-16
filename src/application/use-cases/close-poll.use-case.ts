import { IPollRepository } from '@/domain/repositories/poll-repository.interface';

interface ClosePollRequest {
  pollId: string;
  userId: string;
}

export class ClosePollUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute({ pollId, userId }: ClosePollRequest): Promise<void> {
    const poll = await this.pollRepository.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    if (poll.createdById !== userId) {
      throw new Error('You are not allowed to close this poll');
    }

    await this.pollRepository.update(pollId, {
      status: 'CLOSED',
    });
  }
}