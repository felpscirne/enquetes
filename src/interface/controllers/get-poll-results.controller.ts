import { Request, Response } from 'express';
import { z } from 'zod';
import { GetPollResultsUseCase } from '@/application/use-cases/get-poll-results.use-case';

const paramsSchema = z.object({
  pollId: z.string().uuid(),
});

export class GetPollResultsController {
  constructor(private getPollResultsUseCase: GetPollResultsUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const validation = paramsSchema.safeParse(req.params);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { pollId } = validation.data;
    const userId = req.userId; 

    try {
      const result = await this.getPollResultsUseCase.execute({
        pollId,
        userId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Poll not found') {
        return res.status(404).json({ error: error.message });
      }
      if (error.message === 'You do not have permission to view these results') {
        return res.status(403).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}