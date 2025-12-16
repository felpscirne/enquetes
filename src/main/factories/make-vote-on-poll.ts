import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { PrismaVoteRepository } from '@/infra/database/prisma/repositories/prisma-vote-repository';
import { VoteOnPollUseCase } from '@/application/use-cases/vote-on-poll.use-case';
import { VoteOnPollController } from '@/interface/controllers/vote-on-poll.controller';

export function makeVoteOnPollController() {
  const pollRepository = new PrismaPollRepository();
  const voteRepository = new PrismaVoteRepository();
  const useCase = new VoteOnPollUseCase(pollRepository, voteRepository);
  return new VoteOnPollController(useCase);
}