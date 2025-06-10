import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IJwtService } from '../../domain/user/services/jwt.service';

@Injectable()
export class JwtTokenService implements IJwtService {
  constructor(private readonly jwtService: JwtService) {}

  sign(payload: any): string {
    // Print the options used by JwtService
    // @ts-ignore
    console.log('JwtService options:', this.jwtService['options']);
    return this.jwtService.sign(payload);
  }

  verify(token: string): any {
    return this.jwtService.verify(token);
  }
}
