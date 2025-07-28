import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';

@Injectable()
export class ClearCartUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string): Promise<void> {
    return this.cartRepo.clearCart(userId);
  }
}