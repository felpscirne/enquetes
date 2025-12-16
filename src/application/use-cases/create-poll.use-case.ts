import { IPollRepository, PollWithOptions } from '@/domain/repositories/poll-repository.interface';

interface CreatePollRequest {
  title: string;
  authorId: string;
  options: string[];
  endAt?: Date;
  expectedVotes?: number;
  categories?: string[];
}

export class CreatePollUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute({ title, authorId, options, endAt, expectedVotes, categories }: CreatePollRequest): Promise<PollWithOptions> {
    if (!title) throw new Error('Title is required');
    if (options.length < 2) throw new Error('At least 2 options required');

    if (!endAt && !expectedVotes) {
      throw new Error('You must provide either an End Date OR an Expected Votes limit');
    }
    
    if (endAt && new Date(endAt) <= new Date()) {
      throw new Error('End date must be in the future');
    }

    return this.pollRepository.create({
      title,
      authorId,
      options,
      endAt,           
      expectedVotes,
      categories    
    });
  }
}