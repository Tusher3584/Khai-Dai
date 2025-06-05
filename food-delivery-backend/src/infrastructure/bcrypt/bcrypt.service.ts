import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { IHashService } from '../../domain/user/services/hash.service';

@Injectable()
export class BcryptService implements IHashService {
  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async compare(raw: string, hash: string): Promise<boolean> {
    return bcrypt.compare(raw, hash);
  }
}