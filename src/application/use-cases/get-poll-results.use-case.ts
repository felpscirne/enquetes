import { IPollRepository } from '../../domain/repositories/poll-repository.interface';

interface GetPollResultsRequest {
  pollId: string;
  userId?: string; 
}

interface PollResultOption {
  id: string;
  text: string;
  votes: number;
  percentage: number;
}

interface GetPollResultsResponse {
  pollId: string;
  title: string;
  status: string;
  totalVotes: number;
  options: PollResultOption[];
}

export class GetPollResultsUseCase {
  constructor(private pollRepository: IPollRepository) {}

  async execute({ pollId, userId }: GetPollResultsRequest): Promise<GetPollResultsResponse> {
    const poll = await this.pollRepository.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

  
    if (poll.visibility === 'PRIVATE') {
      if (!userId || poll.createdById !== userId) {
        throw new Error('You do not have permission to view these results');
      }
    }

    const totalVotes = poll.options.reduce((acc, option) => {
      return acc + (option.score || 0); 
    }, 0);

    const optionsWithStats = poll.options.map((option) => {
      const votes = option.score || 0;
      const percentage = totalVotes > 0 
        ? Number(((votes / totalVotes) * 100).toFixed(2)) 
        : 0;

      return {
        id: option.id,
        text: option.text,
        votes: votes,
        percentage: percentage,
      };
    });

    optionsWithStats.sort((a, b) => b.votes - a.votes);

    return {
      pollId: poll.id,
      title: poll.title,
      status: poll.status,
      totalVotes,
      options: optionsWithStats,
    };
  }
}