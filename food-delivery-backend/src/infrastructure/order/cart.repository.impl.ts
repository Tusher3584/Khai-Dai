import { Injectable } from '@nestjs/common';
import { Prisma, Item as PrismaItem } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ICartRepository } from '../../domain/order/repositories/cart.repository';
import { Cart } from '../../domain/order/entities/cart.entity';
import { Item } from '../../domain/order/entities/item.entity';

@Injectable()
export class CartRepositoryImpl implements ICartRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(cart: Cart): Promise<Cart> {
    const createdCart = await this.prisma.cart.create({
      data: {
        userId: cart.userId,
        totalPrice: cart.totalPrice ?? 0,
      },
      include: { items: true },
    });

    const items = createdCart.items.map(
      (item: PrismaItem) =>
        new Item(item.id, item.menuItemId, item.quantity, item.cartUserId)
    );

    return new Cart(createdCart.userId, items, createdCart.totalPrice);
  }

  async getCartByUserId(userId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return null;

    const items = cart.items.map(
      (item: PrismaItem) =>
        new Item(item.id, item.menuItemId, item.quantity, item.cartUserId)
    );
    return new Cart(cart.userId, items, cart.totalPrice);
  }

  async addItem(userId: string, menuItemId: string, quantity: number): Promise<Cart> {
    let cart = await this.prisma.cart.findUnique({
    where: { userId },
    include: { items: true },
  });
  console.log('cart:', cart);
  console.log('cart.items:', cart?.items);


  if (!cart) {
    // Create new cart if none exists
    cart = await this.prisma.cart.create({
      data: {
        userId,
        totalPrice: 0,
      },
      include: { items: true },
    });
  }

  // Now cart and cart.items are defined — safe to proceed
  const existingItem = cart.items.find((item: any) => item.menuItemId === menuItemId);
  
  if (existingItem) {
    await this.prisma.item.update({
      where: { id: existingItem.id },
      data: { quantity: existingItem.quantity + quantity },
    });
  } else {
    await this.prisma.item.create({
      data: { menuItemId, quantity, cartUserId: cart.userId },
    });
  }

  return this.recalculateCart(userId);
}


  async removeItem(userId: string, menuItemId: string): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) throw new Error('Cart not found');

    const itemToRemove = cart.items.find((item: any) => item.menuItemId === menuItemId);
    if (itemToRemove) {
      await this.prisma.item.delete({
        where: { id: itemToRemove.id },
      });
    }

    return this.recalculateCart(userId);
  }

  async updateItem(userId: string, menuItemId: string, quantity: number): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) throw new Error('Cart not found');

    const itemToUpdate = cart.items.find((item: any) => item.menuItemId === menuItemId);
    if (itemToUpdate) {
      await this.prisma.item.update({
        where: { id: itemToUpdate.id },
        data: { quantity },
      });
    }

    return this.recalculateCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) throw new Error('Cart not found');

    await this.prisma.item.deleteMany({
      where: { cartUserId: cart.userId },
    });

    await this.prisma.cart.update({
      where: { userId },
      data: { totalPrice: 0 },
    });
  }

  // Helper to recalculate total price and return updated Cart
  private async recalculateCart(userId: string): Promise<Cart> {
    const updatedCart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!updatedCart) throw new Error('Cart not found after update');

    const items = updatedCart.items.map(
      (item: PrismaItem) =>
        new Item(item.id, item.menuItemId, item.quantity, item.cartUserId)
    );
    const totalPrice = await this.calculateTotalPrice(items);

    await this.prisma.cart.update({
      where: { userId },
      data: { totalPrice },
    });

    return new Cart(updatedCart.userId, items, totalPrice);
  }

  private async calculateTotalPrice(items: Item[]): Promise<number> {
    // Placeholder: Replace with real menu item prices
    return items.reduce((sum, item) => sum + item.quantity * 1, 0);
  }
}
