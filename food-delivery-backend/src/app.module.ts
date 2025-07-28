import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserModule } from './presentation/user/user.module';
import { RestaurantModule } from './presentation/restaurant/restaurant.module';
import { OrderModule } from './presentation/order/order.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    RestaurantModule,
    OrderModule,
  ],
})
export class AppModule {}
