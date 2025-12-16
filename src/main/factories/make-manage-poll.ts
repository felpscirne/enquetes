import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { ClosePollUseCase } from '@/application/use-cases/close-poll.use-case';
import { ExtendPollUseCase } from '@/application/use-cases/extend-poll.use-case';
import { ClosePollController } from '@/interface/controllers/close-poll.controller';
import { ExtendPollController } from '@/interface/controllers/extend-poll.controller';

export function makeClosePollController() {
  const repo = new PrismaPollRepository();
  const useCase = new ClosePollUseCase(repo);
  return new ClosePollController(useCase);
}

export function makeExtendPollController() {
  const repo = new PrismaPollRepository();
  const useCase = new ExtendPollUseCase(repo);
  return new ExtendPollController(useCase);
}