import { Request, Response } from 'express';
import { z } from 'zod';
import { VoteOnPollUseCase } from '@/application/use-cases/vote-on-poll.use-case';

const voteSchema = z.object({
  pollOptionId: z.string().uuid(),
});

export class VoteOnPollController {
  constructor(private voteOnPollUseCase: VoteOnPollUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const validation = voteSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { pollOptionId } = validation.data;
    const { pollId } = req.params; // ID da enquete vem da URL
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
      await this.voteOnPollUseCase.execute({
        pollId,
        pollOptionId,
        userId,
      });

      return res.status(201).send();
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}