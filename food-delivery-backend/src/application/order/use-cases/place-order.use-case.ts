import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/order/repositories/order.repository';
import { Order, OrderStatus } from '../../../domain/order/entities/order.entity';

@Injectable()
export class PlaceOrderUseCase {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository
  ) {}

  async execute(orderProps: { userId: string; items: any[]; deliveryAddress: string }) {
    const order = new Order(
      '', // Generate ID if needed
      orderProps.userId,
      orderProps.items,
      orderProps.deliveryAddress,
      OrderStatus.Pending,
      new Date(),
      new Date()
    );
    return this.orderRepo.placeOrder(order);
  }
}