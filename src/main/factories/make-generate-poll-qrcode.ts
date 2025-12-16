import { PrismaPollRepository } from '@/infra/database/prisma/repositories/prisma-poll-repository';
import { QRCodeAdapter } from '@/infra/services/qrcode-adapter';
import { GeneratePollQRCodeUseCase } from '@/application/use-cases/generate-poll-qrcode.use-case';
import { GeneratePollQRCodeController } from '@/interface/controllers/generate-poll-qrcode.controller';

export function makeGeneratePollQRCodeController() {
  const pollRepository = new PrismaPollRepository();
  const qrCodeGenerator = new QRCodeAdapter(); 
  
  const useCase = new GeneratePollQRCodeUseCase(pollRepository, qrCodeGenerator);
  
  return new GeneratePollQRCodeController(useCase);
}