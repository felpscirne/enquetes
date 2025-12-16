import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { GetPollResultsUseCase } from '@/application/use-cases/get-poll-results.use-case';
import { GetPollResultsController } from '@/interface/controllers/get-poll-results.controller';

export function makeGetPollResultsController() {
  const pollRepository = new PrismaPollRepository();
  const getPollResultsUseCase = new GetPollResultsUseCase(pollRepository);
  const controller = new GetPollResultsController(getPollResultsUseCase);

  return controller;
}