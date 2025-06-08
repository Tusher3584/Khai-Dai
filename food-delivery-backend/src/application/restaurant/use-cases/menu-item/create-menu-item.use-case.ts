import { Inject, Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../../../domain/restaurant/repositories/menu-item.repository';
import { MenuItem } from '../../../../domain/restaurant/entities/menu-item.entity';

@Injectable()
export class CreateMenuItemUseCase {
  constructor(
    @Inject('IMenuItemRepository') private readonly menuItemRepo: IMenuItemRepository
  ) {}

  async execute(data: { restaurantId: string; name: string; description?: string; price: number }): Promise<MenuItem> {
    const menuItem = new MenuItem(
      '', 
      data.restaurantId,
      data.name,
      data.description,
      data.price
    );
    return this.menuItemRepo.create(menuItem);
  }
}