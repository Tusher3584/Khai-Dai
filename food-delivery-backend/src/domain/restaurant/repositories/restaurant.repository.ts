import { Restaurant } from '../entities/restaurant.entity';

export interface IRestaurantRepository {
  findAll(): Promise<Restaurant[]>;
  findById(id: string): Promise<Restaurant | null>;
  create(restaurant: Restaurant): Promise<Restaurant>;
  update(id: string, data: Partial<Restaurant>): Promise<Restaurant>;
  delete(id: string): Promise<void>;
}