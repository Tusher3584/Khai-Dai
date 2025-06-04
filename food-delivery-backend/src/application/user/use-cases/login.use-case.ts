import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { BcryptService } from '../../../infrastructure/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../../presentation/user/dtos/login.dto';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
    private readonly bcryptService: BcryptService,
    private readonly jwtService: JwtService
  ) {}

  async execute(dto: LoginDto): Promise<{ access_token: string }> {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user || !(await this.bcryptService.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { sub: user.id, email: user.email, role: user.role };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}