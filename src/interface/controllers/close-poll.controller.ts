import { Request, Response } from 'express';
import { ClosePollUseCase } from '@/application/use-cases/close-poll.use-case';

export class ClosePollController {
  constructor(private useCase: ClosePollUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { pollId } = req.params;
    const userId = req.userId;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
      await this.useCase.execute({ pollId, userId });
      return res.status(200).json({ message: 'Poll closed successfully' });
    } catch (error: any) {
      if (error.message.includes('not allowed')) return res.status(403).json({ error: error.message });
      return res.status(400).json({ error: error.message });
    }
  }
}