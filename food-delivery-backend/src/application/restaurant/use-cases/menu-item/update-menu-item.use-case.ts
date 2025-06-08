import { Inject, Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../../../domain/restaurant/repositories/menu-item.repository';
import { MenuItem } from '../../../../domain/restaurant/entities/menu-item.entity';

@Injectable()
export class UpdateMenuItemUseCase {
  constructor(
    @Inject('IMenuItemRepository') private readonly menuItemRepo: IMenuItemRepository
  ) {}

  async execute(id: string, data: Partial<Omit<MenuItem, 'id' | 'restaurantId'>>): Promise<MenuItem> {
    return this.menuItemRepo.update(id, data);
  }
}