import { Module } from '@nestjs/common';
import { UserController } from './presentation/user/controllers/user.controller';
import { UserService } from './application/user/user.service';
import { RegisterUseCase } from './application/user/use-cases/register.use-case';
import { LoginUseCase } from './application/user/use-cases/login.use-case';
import { UserRepositoryImpl } from './infrastructure/user/user.repository.impl';
import { PrismaService } from './infrastructure/database/prisma.service';
import { BcryptService } from './infrastructure/bcrypt/bcrypt.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [
    UserService,
    RegisterUseCase,
    LoginUseCase,
    PrismaService,
    BcryptService,
    JwtService,
    {
      provide: 'IUserRepository', // use a string token
      useClass: UserRepositoryImpl,
    },
  ],
})
export class AppModule {}
