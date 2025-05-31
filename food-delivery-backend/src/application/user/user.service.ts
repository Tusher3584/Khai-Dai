 import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from './use-cases/register.use-case';
import { LoginUseCase } from './use-cases/login.use-case';
import { RegisterDto } from '../../presentation/user/dtos/register.dto';
import { LoginDto } from '../../presentation/user/dtos/login.dto';
@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  register(dto: RegisterDto) {
    return this.registerUseCase.execute(dto);
  }

  login(dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}
