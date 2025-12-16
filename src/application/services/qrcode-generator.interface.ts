export interface IQRCodeGenerator {
  generate(text: string): Promise<string>; // retorna a string base64
}