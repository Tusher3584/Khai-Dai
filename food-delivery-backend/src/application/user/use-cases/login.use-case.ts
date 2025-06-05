import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';
import { IHashService } from '../../../domain/user/services/hash.service';
import { IJwtService } from '../../../domain/user/services/jwt.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IJwtService') private readonly jwtService: IJwtService
  ) {}

  async execute(loginProps: { email: string; password: string }): Promise<{ user: User; token: string } | null> {
    const user = await this.userRepo.findByEmail(loginProps.email);
    if (!user) return null;

    const isMatch = await this.hashService.compare(loginProps.password, user.password);
    if (!isMatch) return null;

    const token = this.jwtService.sign({ userId: user.id, email: user.email, role: user.role });
    return { user, token };
  }
}