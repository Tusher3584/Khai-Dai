import { Inject, Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../../../domain/restaurant/repositories/menu-item.repository';
import { MenuItem } from '../../../../domain/restaurant/entities/menu-item.entity';

@Injectable()
export class ListMenuItemsByRestaurantUseCase {
  constructor(
    @Inject('IMenuItemRepository') private readonly menuItemRepo: IMenuItemRepository
  ) {}

  async execute(restaurantId: string): Promise<MenuItem[]> {
    return this.menuItemRepo.findByRestaurant(restaurantId);
  }
}