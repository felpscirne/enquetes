import { IVoteRepository, CreateVoteParams, VotedPollData } from '@/domain/repositories/vote-repository.interface';
import { prisma } from '../client'; 
import { Vote } from '../../../../generated/client';

export class PrismaVoteRepository implements IVoteRepository {
  async create({ pollId, pollOptionId, userId }: CreateVoteParams): Promise<Vote> {
    try {
      const [vote] = await prisma.$transaction([
        
        prisma.vote.create({
          data: {
            pollId,
            optionId: pollOptionId,
            userId,
          },
        }),

        prisma.pollOption.update({
          where: { id: pollOptionId },
          data: {
            score: {
              increment: 1,
            },
          },
        }),
      ]);

      return vote;

    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('User already voted on this poll');
      }
      throw error;
    }
  }

  async findVotedBy(userId: string): Promise<VotedPollData[]> {
    const votes = await prisma.vote.findMany({
      where: {
        userId: userId,
      },
      include: {
        poll: true,   
        option: true, 
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return votes.map((vote) => ({
      pollId: vote.pollId,
      title: vote.poll.title,
      votedAt: vote.createdAt,
      optionChosen: vote.option.text,
    }));
  }

  async hasUserVoted(pollId: string, userId: string): Promise<boolean> {
    const vote = await prisma.vote.findFirst({
      where: {
        pollId: pollId,
        userId: userId,
      },
      select: {
        id: true, 
      },
    });

    return !!vote; 
  }
}