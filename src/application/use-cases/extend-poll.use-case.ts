import { IPollRepository } from '@/domain/repositories/poll-repository.interface';

interface ExtendPollRequest {
  pollId: string;
  userId: string;
  endAt?: Date;
  expectedVotes?: number;
}

export class ExtendPollUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute({ pollId, userId, endAt, expectedVotes }: ExtendPollRequest): Promise<void> {
    const poll = await this.pollRepository.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    if (poll.createdById !== userId) {
      throw new Error('You are not allowed to edit this poll');
    }

    if (endAt && new Date(endAt) <= new Date()) {
      throw new Error('New end date must be in the future');
    }

    await this.pollRepository.update(pollId, {
      endAt,
      expectedVotes,
    });
  }
}