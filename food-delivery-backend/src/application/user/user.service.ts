import { Injectable } from '@nestjs/common';
import { RegisterUseCase } from './use-cases/register.use-case';
import { LoginUseCase } from './use-cases/login.use-case';

@Injectable()
export class UserService {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase
  ) {}

  register(userProps: { email: string; password: string; name?: string; role?: 'Customer' | 'Admin' | 'Delivery' }) {
    return this.registerUseCase.execute(userProps);
  }

  login(loginProps: { email: string; password: string }) {
    return this.loginUseCase.execute(loginProps);
  }
}
