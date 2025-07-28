export class Item {
  constructor(
    public id: string,
    public menuItemId: string,
    public quantity: number,
    public cartId: string
  ) {}
}