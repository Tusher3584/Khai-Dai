import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../../../domain/restaurant/repositories/restaurant.repository';
import { Restaurant } from '../../../../domain/restaurant/entities/restaurant.entity';

@Injectable()
export class CreateRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository') private readonly restaurantRepo: IRestaurantRepository
  ) {}

  async execute(data: { name: string; description?: string; address?: string; rating?: number }): Promise<Restaurant> {
    const restaurant = new Restaurant(
      '', 
      data.name,
      data.description,
      data.address,
      data.rating
    );
    return this.restaurantRepo.create(restaurant);
  }
}