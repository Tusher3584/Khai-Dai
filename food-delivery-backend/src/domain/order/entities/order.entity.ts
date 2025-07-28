export enum OrderStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  OutForDelivery = 'Out for Delivery',
  Delivered = 'Delivered',
}

export class Order {
  constructor(
    public id: string,
    public userId: string,
    public items: Array<{ menuItemId: string; quantity: number }>,
    public deliveryAddress: string,
    public status: OrderStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}