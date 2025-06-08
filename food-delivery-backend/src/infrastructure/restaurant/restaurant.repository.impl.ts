import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { IRestaurantRepository } from '../../domain/restaurant/repositories/restaurant.repository';
import { Restaurant } from '../../domain/restaurant/entities/restaurant.entity';

@Injectable()
export class RestaurantRepositoryImpl implements IRestaurantRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Restaurant[]> {
    const restaurants = await this.prisma.restaurant.findMany();
    return restaurants.map(r =>
      new Restaurant(
        r.id,
        r.name,
        r.description ?? undefined,
        r.address ?? undefined,
        r.rating ?? undefined
      )
    );
  }

  async findById(id: string): Promise<Restaurant | null> {
    const r = await this.prisma.restaurant.findUnique({ where: { id } });
    return r
      ? new Restaurant(
          r.id,
          r.name,
          r.description ?? undefined,
          r.address ?? undefined,
          r.rating ?? undefined
        )
      : null;
  }

  async create(restaurant: Restaurant): Promise<Restaurant> {
    const created = await this.prisma.restaurant.create({
      data: {
        name: restaurant.name,
        description: restaurant.description,
        address: restaurant.address,
        rating: restaurant.rating,
      },
    });
    return new Restaurant(
      created.id,
      created.name,
      created.description ?? undefined,
      created.address ?? undefined,
      created.rating ?? undefined
    );
  }

  async update(id: string, data: Partial<Restaurant>): Promise<Restaurant> {
    const updated = await this.prisma.restaurant.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        address: data.address,
        rating: data.rating,
      },
    });
    return new Restaurant(
      updated.id,
      updated.name,
      updated.description ?? undefined,
      updated.address ?? undefined,
      updated.rating ?? undefined
    );
  }

  async delete(id: string): Promise<void> {
    await this.prisma.restaurant.delete({ where: { id } });
  }
}