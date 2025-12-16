import QRCode from 'qrcode';
import { IQRCodeGenerator } from '@/application/services/qrcode-generator.interface';

export class QRCodeAdapter implements IQRCodeGenerator {
  async generate(text: string): Promise<string> {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      throw new Error('Failed to generate QR Code');
    }
  }
}