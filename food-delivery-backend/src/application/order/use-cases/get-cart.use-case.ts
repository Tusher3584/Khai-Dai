import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';
import { Cart } from '../../../domain/order/entities/cart.entity';

@Injectable()
export class GetCartUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string): Promise<Cart | null> {
    return this.cartRepo.getCartByUserId(userId);
  }
}