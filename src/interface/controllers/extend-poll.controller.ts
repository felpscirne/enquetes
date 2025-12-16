import { Request, Response } from 'express';
import { z } from 'zod';
import { ExtendPollUseCase } from '@/application/use-cases/extend-poll.use-case';

const extendSchema = z.object({
  endAt: z.coerce.date().optional(),
  expectedVotes: z.number().int().positive().optional(),
});

export class ExtendPollController {
  constructor(private useCase: ExtendPollUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { pollId } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    const validation = extendSchema.safeParse(req.body);
    if (!validation.success) return res.status(400).json({ errors: validation.error.issues });

    try {
      await this.useCase.execute({
        pollId,
        userId,
        ...validation.data
      });
      return res.status(200).json({ message: 'Poll updated successfully' });
    } catch (error: any) {
      if (error.message.includes('not allowed')) return res.status(403).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  }
}