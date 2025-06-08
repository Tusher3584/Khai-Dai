export class Restaurant {
  constructor(
    public id: string,
    public name: string,
    public description?: string,
    public address?: string,
    public rating?: number
  ) {}
}