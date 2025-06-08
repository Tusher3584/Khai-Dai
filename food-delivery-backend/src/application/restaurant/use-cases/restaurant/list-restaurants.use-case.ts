import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../../../domain/restaurant/repositories/restaurant.repository';
import { Restaurant } from '../../../../domain/restaurant/entities/restaurant.entity';

@Injectable()
export class ListRestaurantsUseCase {
  constructor(
    @Inject('IRestaurantRepository') private readonly restaurantRepo: IRestaurantRepository
  ) {}

  async execute(): Promise<Restaurant[]> {
    return this.restaurantRepo.findAll();
  }
}