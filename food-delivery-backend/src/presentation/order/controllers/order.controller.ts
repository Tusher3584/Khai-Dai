import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { OrderDto } from '../dtos/order.dto';
import { UpdateOrderStatusDto } from '../dtos/update-order-status.dto';
import { PlaceOrderUseCase } from '../../../application/order/use-cases/place-order.use-case';
import { GetOrderUseCase } from '../../../application/order/use-cases/get-order.use-case';
import { GetOrderHistoryUseCase } from '../../../application/order/use-cases/get-order-history.use-case';
import { UpdateOrderStatusUseCase } from '../../../application/order/use-cases/update-order-status.use-case';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly placeOrder: PlaceOrderUseCase,
    private readonly getOrder: GetOrderUseCase,
    private readonly getOrderHistory: GetOrderHistoryUseCase,
    private readonly updateOrderStatus: UpdateOrderStatusUseCase,
  ) {}

  @Post()
  async create(@Body() dto: OrderDto) {
    const orderProps = {
      userId: dto.userId,
      items: dto.items,
      deliveryAddress: dto.deliveryAddress,
    };
    return this.placeOrder.execute(orderProps);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getOrder.execute(id);
  }

  @Get('user/:userId')
  async getUserOrders(@Param('userId') userId: string) {
    return this.getOrderHistory.execute(userId);
  }

  @Patch('status')
  async updateStatus(@Body() dto: UpdateOrderStatusDto) {
    return this.updateOrderStatus.execute(dto.orderId, dto.status as any);
  }
}