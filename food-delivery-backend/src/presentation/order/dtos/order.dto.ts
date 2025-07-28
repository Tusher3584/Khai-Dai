export class OrderItemDto {
  menuItemId: string;
  quantity: number;
}

export class OrderDto {
  id?: string;
  userId: string;
  items: OrderItemDto[];
  deliveryAddress: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}