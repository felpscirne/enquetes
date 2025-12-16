import { Poll, PollOption } from '../../generated/client';

export type PollWithOptions = Poll & { options: PollOption[] };

export interface CreatePollParams {
  title: string;
  authorId: string; 
  options: string[];
  endAt?: Date;
  expectedVotes?: number;
  categories?: string[];
}

export interface UpdatePollParams {
  status?: 'OPEN' | 'CLOSED';
  endAt?: Date;
  expectedVotes?: number;
}

export interface FindAllParams {
  page: number;
  limit: number;
  category?: string;
  status?: 'OPEN' | 'CLOSED';
  minVotes?: number;
  maxVotes?: number;
}

export interface IPollRepository {
  create(data: CreatePollParams): Promise<PollWithOptions>;
  findById(id: string): Promise<PollWithOptions | null>; 
  update(id: string, data: UpdatePollParams): Promise<Poll>;
  getDetails(id: string): Promise<PollWithOptions | null>;
  findAll(params: FindAllParams): Promise<{ polls: PollWithOptions[]; total: number }>;
}