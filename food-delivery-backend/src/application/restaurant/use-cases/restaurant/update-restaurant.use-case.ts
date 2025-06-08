import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../../../domain/restaurant/repositories/restaurant.repository';
import { Restaurant } from '../../../../domain/restaurant/entities/restaurant.entity';

@Injectable()
export class UpdateRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository') private readonly restaurantRepo: IRestaurantRepository
  ) {}

  async execute(id: string, data: Partial<Omit<Restaurant, 'id'>>): Promise<Restaurant> {
    return this.restaurantRepo.update(id, data);
  }
}