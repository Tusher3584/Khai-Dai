import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/order/repositories/order.repository';
import { Order, OrderStatus } from '../../../domain/order/entities/order.entity';

@Injectable()
export class UpdateOrderStatusUseCase {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository
  ) {}

  async execute(orderId: string, status: OrderStatus): Promise<Order> {
    return this.orderRepo.updateOrderStatus(orderId, status);
  }
}