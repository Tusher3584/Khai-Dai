import { Module } from '@nestjs/common';
import { UserModule } from './presentation/user/user.module';
import { RestaurantModule } from './presentation/restaurant/restaurant.module';

@Module({
  imports: [UserModule, RestaurantModule],
})
export class AppModule {}
