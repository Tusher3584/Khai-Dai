import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './presentation/user/user.module';
import { RestaurantModule } from './presentation/restaurant/restaurant.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    UserModule,
    RestaurantModule,
  ],
})
export class AppModule {}
