import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../domain/order/repositories/order.repository';
import { Order } from '../../../domain/order/entities/order.entity';

@Injectable()
export class GetOrderHistoryUseCase {
  constructor(
    @Inject('IOrderRepository') private readonly orderRepo: IOrderRepository
  ) {}

  async execute(userId: string): Promise<Order[]> {
    return this.orderRepo.getOrdersByUserId(userId);
  }
}