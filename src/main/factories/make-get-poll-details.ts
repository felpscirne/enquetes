import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { PrismaVoteRepository } from '@/infra/database/prisma/repositories/prisma-vote-repository';
import { GetPollDetailsUseCase } from '@/application/use-cases/get-poll-details.use-case';
import { GetPollDetailsController } from '@/interface/controllers/get-poll-details.controller';

export function makeGetPollDetailsController() {
  const pollRepository = new PrismaPollRepository();
  const voteRepository = new PrismaVoteRepository();
  
  const useCase = new GetPollDetailsUseCase(pollRepository, voteRepository);
  
  return new GetPollDetailsController(useCase);
}