import { IPollRepository } from '../../domain/repositories/poll-repository.interface';

interface ListPollsRequest {
  page?: number;
  limit?: number;
  category?: string;
  status?: 'OPEN' | 'CLOSED';
}

export class ListPollsUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute({ page = 1, limit = 10, category, status }: ListPollsRequest) {
    const { polls, total } = await this.pollRepository.findAll({
      page,
      limit,
      category,
      status,
    });

    return {
      polls,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}