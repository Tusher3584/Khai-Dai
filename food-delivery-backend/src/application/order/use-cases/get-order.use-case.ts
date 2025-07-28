import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/order/repositories/order.repository';
import { Order } from '../../../domain/order/entities/order.entity';

@Injectable()
export class GetOrderUseCase {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository
  ) {}

  async execute(orderId: string): Promise<Order | null> {
    return this.orderRepo.getOrderById(orderId);
  }
}