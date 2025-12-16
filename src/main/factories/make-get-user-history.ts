import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { PrismaVoteRepository } from '@/infra/database/prisma/repositories/prisma-vote-repository'; 
import { GetUserCreatedPollsUseCase } from '@/application/use-cases/get-user-created-polls.use-case';
import { GetUserVotedPollsUseCase } from '@/application/use-cases/get-user-voted-polls.use-case';
import { GetUserHistoryController } from '@/interface/controllers/get-user-history.controller';

export function makeGetUserHistoryController() {
  const pollRepo = new PrismaPollRepository();
  const voteRepo = new PrismaVoteRepository(); 

  const createdUseCase = new GetUserCreatedPollsUseCase(pollRepo);
  
  const votedUseCase = new GetUserVotedPollsUseCase(voteRepo);
  
  return new GetUserHistoryController(createdUseCase, votedUseCase);
}