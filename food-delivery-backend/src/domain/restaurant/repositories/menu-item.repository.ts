import { MenuItem } from '../entities/menu-item.entity';

export interface IMenuItemRepository {
  findByRestaurant(restaurantId: string): Promise<MenuItem[]>;
  findById(id: string): Promise<MenuItem | null>;
  create(menuItem: MenuItem): Promise<MenuItem>;
  update(id: string, data: Partial<MenuItem>): Promise<MenuItem>;
  delete(id: string): Promise<void>;
}