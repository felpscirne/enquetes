import { prisma } from '../client'; 
import { IPollRepository, CreatePollParams, UpdatePollParams, PollWithOptions, FindAllParams } from '../../../../domain/repositories/poll-repository.interface';
import { Poll } from '../../../../generated/client';

export class PrismaPollRepository implements IPollRepository {

  async create(data: CreatePollParams): Promise<PollWithOptions> {
    const poll = await prisma.poll.create({
      data: {
        title: data.title,
        createdById: data.authorId,
        endAt: data.endAt ?? null,
        expectedVotes: data.expectedVotes ?? null,
        categories: data.categories ?? [],
        
        options: {
          createMany: {
            data: data.options.map((optionText) => ({
              text: optionText,
              score: 0,
            })),
          },
        },
      },
      include: {
        options: true,
      },
    });

    return poll;
  }

  async findById(id: string): Promise<PollWithOptions | null> {
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: {
        options: true,
      },
    });

    return poll;
  }

  async update(id: string, data: UpdatePollParams): Promise<Poll> {
    const poll = await prisma.poll.update({
      where: { id },
      data: {
        status: data.status as any,
        endAt: data.endAt,
        expectedVotes: data.expectedVotes,
      },
    });

    return poll;
  }

  async getDetails(id: string): Promise<PollWithOptions | null> {
    return this.findById(id);
  }

  async findAll({ page, limit, category, status, minVotes, maxVotes }: FindAllParams): Promise<{ polls: PollWithOptions[]; total: number }> {
    const skip = (page - 1) * limit;

    const where: any = {};

    if (status) {
      where.status = status;
    }

    if (category) {
      where.categories = {
        has: category,
      };
    }
    const [polls, total] = await Promise.all([
      prisma.poll.findMany({
        where,
        take: limit,
        skip: skip,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          options: true,
        },
      }),
      prisma.poll.count({ where }),
    ]);

    return {
      polls,
      total,
    };
  }
}