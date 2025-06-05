import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { IHashService } from '../../../domain/user/services/hash.service';
import { IJwtService } from '../../../domain/user/services/jwt.service';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IJwtService') private readonly jwtService: IJwtService
  ) {}

  async execute(userProps: { email: string; password: string; name?: string; role?: 'Customer' | 'Admin' | 'Delivery' }): Promise<User> {
    const hashedPassword = await this.hashService.hash(userProps.password);
    const user = new User(
      uuid(),
      userProps.email,
      hashedPassword,
      userProps.role ?? 'Customer', 
      userProps.name
    );
    return this.userRepo.create(user);
  }
}
