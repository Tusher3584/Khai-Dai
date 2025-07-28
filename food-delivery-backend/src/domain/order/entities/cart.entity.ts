import { Item } from './item.entity';

export class Cart {
  constructor(
    public userId: string,
    public items: Item[],
    public totalPrice: number
  ) {}
}