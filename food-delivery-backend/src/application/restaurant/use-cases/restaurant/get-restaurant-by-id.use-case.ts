import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../../../domain/restaurant/repositories/restaurant.repository';
import { Restaurant } from '../../../../domain/restaurant/entities/restaurant.entity';

@Injectable()
export class GetRestaurantByIdUseCase {
  constructor(
    @Inject('IRestaurantRepository') private readonly restaurantRepo: IRestaurantRepository
  ) {}

  async execute(id: string): Promise<Restaurant | null> {
    return this.restaurantRepo.findById(id);
  }
}