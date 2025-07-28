import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';
import { Cart } from '../../../domain/order/entities/cart.entity';

@Injectable()
export class RemoveFromCartUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string, menuItemId: string): Promise<Cart> {
    return this.cartRepo.removeItem(userId, menuItemId);
  }
}