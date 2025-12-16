import { Request, Response } from 'express';
import { z } from 'zod';
import { GetPollDetailsUseCase } from '@/application/use-cases/get-poll-details.use-case';

const paramsSchema = z.object({
  pollId: z.string().uuid(),
});

export class GetPollDetailsController {
  constructor(private getPollDetailsUseCase: GetPollDetailsUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const validation = paramsSchema.safeParse(req.params);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { pollId } = validation.data;
    
    
    const userId = req.userId; 

    try {
      const result = await this.getPollDetailsUseCase.execute({
        pollId,
        userId,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Poll not found') {
        return res.status(404).json({ error: error.message });
      }
      return res.status(400).json({ error: error.message });
    }
  }
}