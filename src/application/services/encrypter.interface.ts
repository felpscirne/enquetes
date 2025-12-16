export interface IEncrypter {
  hash(plaintext: string): Promise<string>;
  compare(plaintext: string, digest: string): Promise<boolean>;
}