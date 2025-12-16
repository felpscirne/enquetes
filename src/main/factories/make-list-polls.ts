import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { ListPollsUseCase } from '@/application/use-cases/list-polls.use-case';
import { ListPollsController } from '@/interface/controllers/list-polls.controller';

export function makeListPollsController() {
  const repository = new PrismaPollRepository();
  const useCase = new ListPollsUseCase(repository);
  return new ListPollsController(useCase);
}