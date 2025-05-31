export class User {
  constructor(
    public id: string,
    public email: string,
    public password: string,
    public role: 'Customer' | 'Admin' | 'Delivery',
    public name?: string
  ) {}
}
