import { Inject, Injectable } from '@nestjs/common';
import { IRestaurantRepository } from '../../../../domain/restaurant/repositories/restaurant.repository';

@Injectable()
export class DeleteRestaurantUseCase {
  constructor(
    @Inject('IRestaurantRepository') private readonly restaurantRepo: IRestaurantRepository
  ) {}

  async execute(id: string): Promise<void> {
    return this.restaurantRepo.delete(id);
  }
}