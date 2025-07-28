import { Cart } from '../entities/cart.entity';

export interface ICartRepository {
  create(cart: Cart): Promise<Cart>;
  getCartByUserId(userId: string): Promise<Cart | null>;
  addItem(userId: string, menuItemId: string, quantity: number): Promise<Cart>;
  removeItem(userId: string, menuItemId: string): Promise<Cart>;
  updateItem(userId: string, menuItemId: string, quantity: number): Promise<Cart>;
  clearCart(userId: string): Promise<void>;
}