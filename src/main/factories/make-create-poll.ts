import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { CreatePollUseCase } from '@/application/use-cases/create-poll.use-case';
import { CreatePollController } from '@/interface/controllers/create-poll.controller';

export function makeCreatePollController() {
  // Instancia o repositório (Infra)
  const pollRepository = new PrismaPollRepository();
  
  // Injeta o repositório no caso de uso (Application)
  const createPollUseCase = new CreatePollUseCase(pollRepository);
  
  // Injeta o caso de uso no controller (Interface)
  return new CreatePollController(createPollUseCase);
}