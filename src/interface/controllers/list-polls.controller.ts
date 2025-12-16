import { Request, Response } from 'express';
import { z } from 'zod';
import { ListPollsUseCase } from '@/application/use-cases/list-polls.use-case';

const listPollsQuerySchema = z.object({
  page: z.string().optional().transform(Number),
  limit: z.string().optional().transform(Number),
  category: z.string().optional(),
  status: z.enum(['OPEN', 'CLOSED']).optional(),
});

export class ListPollsController {
  constructor(private listPollsUseCase: ListPollsUseCase) {}

  handle = async (req: Request, res: Response): Promise<Response> => {
    const validation = listPollsQuerySchema.safeParse(req.query);

    if (!validation.success) {
      return res.status(400).json({ errors: validation.error.issues });
    }

    const { page, limit, category, status } = validation.data;

    try {
      const result = await this.listPollsUseCase.execute({
        page: page || 1,
        limit: limit || 10,
        category,
        status,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}