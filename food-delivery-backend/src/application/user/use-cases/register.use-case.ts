import { Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';
import { BcryptService } from '../../../infrastructure/bcrypt/bcrypt.service';
import { RegisterDto } from '../../../presentation/user/dtos/register.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class RegisterUseCase {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly bcryptService: BcryptService
  ) {}

  async execute(dto: RegisterDto): Promise<User> {
    const hashedPassword = await this.bcryptService.hash(dto.password);
    const user = new User(uuid(), dto.email, hashedPassword, 'Customer');
    return this.userRepo.create(user);
  }
}
