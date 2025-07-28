import { Inject, Injectable } from '@nestjs/common';
import { ICartRepository } from '../../../domain/order/repositories/cart.repository';
import { Cart } from '../../../domain/order/entities/cart.entity';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CreateCartUseCase {
  constructor(
    @Inject('ICartRepository') private readonly cartRepo: ICartRepository
  ) {}

  async execute(userId: string): Promise<Cart> {
    const cart = new Cart(
      userId,  // userId
      [],      // items (empty at registration)
      0        // totalPrice
    );

    return await this.cartRepo.create(cart);
  }
}
