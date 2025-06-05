export interface IHashService {
  hash(password: string): Promise<string>;
  compare(raw: string, hash: string): Promise<boolean>;
}