import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string, menuItemId: string, quantity: number) {
    return this.cartRepo.addItem(userId, menuItemId, quantity);
  }
}