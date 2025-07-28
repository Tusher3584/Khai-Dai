import { PrismaService } from '../database/prisma.service';
import { IOrderRepository } from '../../domain/order/repositories/order.repository';
import { Order, OrderStatus } from '../../domain/order/entities/order.entity';

export class OrderRepositoryImpl implements IOrderRepository {
  constructor(private readonly prisma: PrismaService) {}

  async placeOrder(order: Order): Promise<Order> {
    const created = await this.prisma.order.create({
      data: {
        userId: order.userId,
        items: order.items,
        deliveryAddress: order.deliveryAddress,
        status: order.status,
      },
    });
    return new Order(
      created.id,
      created.userId,
      Array.isArray(created.items) ? created.items as Array<{ menuItemId: string; quantity: number }> : [],
      created.deliveryAddress,
      created.status as OrderStatus,
      created.createdAt,
      created.updatedAt,
    );
  }

  async getOrderById(orderId: string): Promise<Order | null> {
    const found = await this.prisma.order.findUnique({
      where: { id: orderId },
    });
    if (!found) return null;
    return new Order(
      found.id,
      found.userId,
      Array.isArray(found.items) ? found.items as Array<{ menuItemId: string; quantity: number }> : [],
      found.deliveryAddress,
      found.status as OrderStatus,
      found.createdAt,
      found.updatedAt,
    );
  }

  async getOrdersByUserId(userId: string): Promise<Order[]> {
    const orders = await this.prisma.order.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return orders.map(
      (o) =>
        new Order(
          o.id,
          o.userId,
          Array.isArray(o.items) ? o.items as Array<{ menuItemId: string; quantity: number }> : [],
          o.deliveryAddress,
          o.status as OrderStatus,
          o.createdAt,
          o.updatedAt,
        ),
    );
  }

  async updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order> {
    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: { status },
    });
    return new Order(
      updated.id,
      updated.userId,
      Array.isArray(updated.items) ? updated.items as Array<{ menuItemId: string; quantity: number }> : [],
      updated.deliveryAddress,
      updated.status as OrderStatus,
      updated.createdAt,
      updated.updatedAt,
    );
  }
}