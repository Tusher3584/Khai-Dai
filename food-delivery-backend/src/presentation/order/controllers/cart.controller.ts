import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { AddToCartUseCase } from '../../../application/order/use-cases/add-to-cart.use-case';
import { RemoveFromCartUseCase } from '../../../application/order/use-cases/remove-from-cart.use-case';
import { GetCartUseCase } from '../../../application/order/use-cases/get-cart.use-case';
import { ClearCartUseCase } from '../../../application/order/use-cases/clear-cart.use-case';
import { UpdateCartItemUseCase } from '../../../application/order/use-cases/update-cart-item.use-case';

@Controller('carts')
export class CartController {
  constructor(
    private readonly addToCart: AddToCartUseCase,
    private readonly removeFromCart: RemoveFromCartUseCase,
    private readonly getCart: GetCartUseCase,
    private readonly clearCart: ClearCartUseCase,
    private readonly updateCartItem: UpdateCartItemUseCase,
  ) {}

  @Get(':userId')
  async get(@Param('userId') userId: string) {
    return this.getCart.execute(userId);
  }

  @Post()
  async add(@Body() { userId, menuItemId, quantity }: { userId: string; menuItemId: string; quantity: number }) {
    return this.addToCart.execute(userId, menuItemId, quantity);
  }

  @Patch()
  async update(@Body() { userId, menuItemId, quantity }: { userId: string; menuItemId: string; quantity: number }) {
    return this.updateCartItem.execute(userId, menuItemId, quantity);
  }

  @Delete(':userId/:menuItemId')
  async remove(@Param('userId') userId: string, @Param('menuItemId') menuItemId: string) {
    return this.removeFromCart.execute(userId, menuItemId);
  }

  @Delete(':userId')
  async clear(@Param('userId') userId: string) {
    return this.clearCart.execute(userId);
  }
}