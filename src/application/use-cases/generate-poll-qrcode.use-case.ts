import { IPollRepository } from '@/domain/repositories/poll-repository.interface';
import { IQRCodeGenerator } from '@/application/services/qrcode-generator.interface';

export class GeneratePollQRCodeUseCase {
  constructor(
    private pollRepository: IPollRepository,
    private qrCodeGenerator: IQRCodeGenerator
  ) {}

  async execute(pollId: string): Promise<{ qrCodeImage: string, pollUrl: string }> {
    const poll = await this.pollRepository.findById(pollId);

    if (!poll) {
      throw new Error('Poll not found');
    }

    const pollUrl = `http://localhost:3000/polls/${pollId}`;

    const qrCodeImage = await this.qrCodeGenerator.generate(pollUrl);

    return {
      pollUrl,
      qrCodeImage, // String base64 para colocar numa tag <img src="..." />
    };
  }
}