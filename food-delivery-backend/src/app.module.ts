import { Module } from '@nestjs/common';
import { UserModule } from './presentation/user/user.module';

@Module({
  imports: [UserModule],
})
export class AppModule {}
