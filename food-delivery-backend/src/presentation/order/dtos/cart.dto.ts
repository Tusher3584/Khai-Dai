export class CartItemDto {
  menuItemId: string;
  quantity: number;
}

export class CartDto {
  id?: string;
  userId: string;
  items: CartItemDto[];
  totalPrice?: number;
}