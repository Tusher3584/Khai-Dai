import { Module } from '@nestjs/common';
import { OrderModule } from '../order/order.module';
import { UserController } from './controllers/user.controller';
import { UserService } from '../../application/user/user.service';
import { RegisterUseCase } from '../../application/user/use-cases/register.use-case';
import { LoginUseCase } from '../../application/user/use-cases/login.use-case';
import { UserRepositoryImpl } from '../../infrastructure/user/user.repository.impl';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { BcryptService } from '../../infrastructure/bcrypt/bcrypt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtTokenModule } from '../../infrastructure/jwt/jwt.module'; 
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';

@Module({
  imports: [
    ConfigModule,
    JwtTokenModule, 
    OrderModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RegisterUseCase,
    LoginUseCase,
    PrismaService,
    BcryptService,
    {
      provide: 'IUserRepository',
      useClass: UserRepositoryImpl,
    },
    {
      provide: 'IHashService',
      useClass: BcryptService,
    },
    {
      provide: 'IJwtService',
      useClass: JwtTokenService,
    },
  ],
  exports: [UserService],
})
export class UserModule {}