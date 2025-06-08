import { Inject, Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../../../domain/restaurant/repositories/menu-item.repository';
import { MenuItem } from '../../../../domain/restaurant/entities/menu-item.entity';

@Injectable()
export class GetMenuItemByIdUseCase {
  constructor(
    @Inject('IMenuItemRepository') private readonly menuItemRepo: IMenuItemRepository
  ) {}

  async execute(id: string): Promise<MenuItem | null> {
    return this.menuItemRepo.findById(id);
  }
}