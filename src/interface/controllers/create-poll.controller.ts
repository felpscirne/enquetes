import { Request, Response } from 'express';
import { z } from 'zod';
import { CreatePollUseCase } from '@/application/use-cases/create-poll.use-case';

const createPollSchema = z.object({
  title: z.string(),
  options: z.array(z.string()),
  endAt: z.coerce.date().optional(), 
  expectedVotes: z.number().optional(),
  categories: z.array(z.string()).optional(),
});

export class CreatePollController {
  constructor(private createPollUseCase: CreatePollUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const validation = createPollSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { title, options, endAt, expectedVotes, categories} = validation.data;
    const authorId = req.userId; 

    if (!authorId) return res.status(401).json({ error: 'User not authenticated' });

    try {
      const poll = await this.createPollUseCase.execute({
        title,
        options,
        authorId,
        endAt,
        expectedVotes,
        categories
      });

      return res.status(201).json(poll);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}