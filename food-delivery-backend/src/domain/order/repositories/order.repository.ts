import { Order, OrderStatus } from '../entities/order.entity';

export interface IOrderRepository {
  placeOrder(order: Order): Promise<Order>;
  getOrderById(orderId: string): Promise<Order | null>;
  getOrdersByUserId(userId: string): Promise<Order[]>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
}