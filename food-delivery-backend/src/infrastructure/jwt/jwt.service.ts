import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '../../domain/user/services/jwt.service';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    return this.jwtService.sign(payload);
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }
}
