import { Vote } from '../../generated/client';

export interface CreateVoteParams {
  pollId: string;
  pollOptionId: string;
  userId: string;
}

export interface IVoteRepository {
  create(data: CreateVoteParams): Promise<Vote>;
}