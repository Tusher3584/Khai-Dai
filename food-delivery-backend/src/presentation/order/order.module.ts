import { Module } from '@nestjs/common';
import { CreateCartOnUserRegisteredListener } from '../../application/order/listeners/create-cart-on-user-registered.listener';
import { CreateCartUseCase } from '../../application/order/use-cases/create-cart.use-case';
import { CartRepositoryImpl } from '../../infrastructure/order/cart.repository.impl';
import { OrderRepositoryImpl } from '../../infrastructure/order/order.repository.impl';
import { AddToCartUseCase } from '../../application/order/use-cases/add-to-cart.use-case';
import { PlaceOrderUseCase } from '../../application/order/use-cases/place-order.use-case';
import { ClearCartUseCase } from '../../application/order/use-cases/clear-cart.use-case';
import { GetCartUseCase } from '../../application/order/use-cases/get-cart.use-case';
import { GetOrderUseCase } from '../../application/order/use-cases/get-order.use-case';
import { UpdateCartItemUseCase } from '../../application/order/use-cases/update-cart-item.use-case';
import { UpdateOrderStatusUseCase } from '../../application/order/use-cases/update-order-status.use-case';
import { RemoveFromCartUseCase } from '../../application/order/use-cases/remove-from-cart.use-case';
import { GetOrderHistoryUseCase } from '../../application/order/use-cases/get-order-history.use-case';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { OrderController } from './controllers/order.controller';
import { CartController } from './controllers/cart.controller';

@Module({
  providers: [
    PrismaService,
    { provide: 'ICartRepository', useClass: CartRepositoryImpl },
    { provide: 'IOrderRepository', useClass: OrderRepositoryImpl },
    CreateCartUseCase,
    AddToCartUseCase,
    PlaceOrderUseCase,
    ClearCartUseCase,
    GetCartUseCase,
    GetOrderUseCase,
    CreateCartOnUserRegisteredListener,
    UpdateCartItemUseCase,
    UpdateOrderStatusUseCase,
    RemoveFromCartUseCase,
    GetOrderHistoryUseCase,
  ],
  controllers: [OrderController, CartController],
  exports: [CreateCartUseCase],
})
export class OrderModule {}