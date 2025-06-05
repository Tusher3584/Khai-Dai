import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../../../application/user/user.service';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    const userProps = {
      email: dto.email,
      password: dto.password,
      name: dto.name,
      role: dto.role, 
    };
    return this.userService.register(userProps);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    
    const loginProps = {
      email: dto.email,
      password: dto.password,
    };
    return this.userService.login(loginProps);
  }
}