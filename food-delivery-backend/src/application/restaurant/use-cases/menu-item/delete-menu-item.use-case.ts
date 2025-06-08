import { Inject, Injectable } from '@nestjs/common';
import { IMenuItemRepository } from '../../../../domain/restaurant/repositories/menu-item.repository';

@Injectable()
export class DeleteMenuItemUseCase {
  constructor(
    @Inject('IMenuItemRepository') private readonly menuItemRepo: IMenuItemRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.menuItemRepo.delete(id);
  }
}