import { Request, Response } from 'express';
import { GetUserCreatedPollsUseCase } from '@/application/use-cases/get-user-created-polls.use-case';
import { GetUserVotedPollsUseCase } from '@/application/use-cases/get-user-voted-polls.use-case';

export class GetUserHistoryController {
  constructor(
    private getCreatedUseCase?: GetUserCreatedPollsUseCase,
    private getVotedUseCase?: GetUserVotedPollsUseCase
  ) {}

  handleCreated = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    if (!this.getCreatedUseCase) throw new Error('UseCase not injected');

    const polls = await this.getCreatedUseCase.execute(userId);
    return res.json({ polls });
  }

  handleVoted = async (req: Request, res: Response): Promise<Response> => {
    const userId = req.userId;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    if (!this.getVotedUseCase) throw new Error('UseCase not injected');

    const votes = await this.getVotedUseCase.execute(userId);
    return res.json({ votes });
  }
}