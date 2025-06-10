import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from '../../application/user/user.service';
import { RegisterUseCase } from '../../application/user/use-cases/register.use-case';
import { LoginUseCase } from '../../application/user/use-cases/login.use-case';
import { UserRepositoryImpl } from '../../infrastructure/user/user.repository.impl';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { BcryptService } from '../../infrastructure/bcrypt/bcrypt.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtTokenService } from '../../infrastructure/jwt/jwt.service';

@Module({
  imports: [
    ConfigModule, // <-- add this if not already present
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        console.log('JWT_SECRET in useFactory:', config.get<string>('JWT_SECRET'));
        return {
          secret: config.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '1d' },
        };
      },
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    RegisterUseCase,
    LoginUseCase,
    PrismaService,
    BcryptService,
    //JwtService,
    JwtTokenService,
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
      useClass: JwtTokenService, // <-- FIXED HERE
    },
  ],
  exports: [UserService],
})
export class UserModule {}