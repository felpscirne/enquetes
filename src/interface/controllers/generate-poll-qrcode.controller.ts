import { Request, Response } from 'express';
import { GeneratePollQRCodeUseCase } from '@/application/use-cases/generate-poll-qrcode.use-case';

export class GeneratePollQRCodeController {
  constructor(private useCase: GeneratePollQRCodeUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { pollId } = req.params;

    try {
      const result = await this.useCase.execute(pollId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}