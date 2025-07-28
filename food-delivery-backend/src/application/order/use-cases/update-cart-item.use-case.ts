import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';
import { Cart } from '../../../domain/order/entities/cart.entity';

@Injectable()
export class UpdateCartItemUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string, menuItemId: string, quantity: number): Promise<Cart> {
    return this.cartRepo.updateItem(userId, menuItemId, quantity);
  }
}