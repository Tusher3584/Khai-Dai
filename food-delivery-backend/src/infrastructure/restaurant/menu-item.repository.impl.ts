import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IMenuItemRepository } from '../../domain/restaurant/repositories/menu-item.repository';
import { MenuItem } from '../../domain/restaurant/entities/menu-item.entity';

@Injectable()
export class MenuItemRepositoryImpl implements IMenuItemRepository {
  constructor(private prisma: PrismaService) {}

  async findByRestaurant(restaurantId: string): Promise<MenuItem[]> {
    const items = await this.prisma.menuItem.findMany({ where: { restaurantId } });
    return items.map(i =>
      new MenuItem(
        i.id,
        i.restaurantId,
        i.name,
        i.description ?? undefined,
        i.price
      )
    );
  }

  async findById(id: string): Promise<MenuItem | null> {
    const i = await this.prisma.menuItem.findUnique({ where: { id } });
    return i
      ? new MenuItem(
          i.id,
          i.restaurantId,
          i.name,
          i.description ?? undefined,
          i.price
        )
      : null;
  }

  async create(menuItem: MenuItem): Promise<MenuItem> {
    const created = await this.prisma.menuItem.create({
      data: {
        restaurantId: menuItem.restaurantId,
        name: menuItem.name,
        description: menuItem.description,
        price: menuItem.price,
      },
    });
    return new MenuItem(
      created.id,
      created.restaurantId,
      created.name,
      created.description ?? undefined,
      created.price
    );
  }

  async update(id: string, data: Partial<MenuItem>): Promise<MenuItem> {
    const updated = await this.prisma.menuItem.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
      },
    });
    return new MenuItem(
      updated.id,
      updated.restaurantId,
      updated.name,
      updated.description ?? undefined,
      updated.price
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.menuItem.delete({ where: { id } });
  }
}