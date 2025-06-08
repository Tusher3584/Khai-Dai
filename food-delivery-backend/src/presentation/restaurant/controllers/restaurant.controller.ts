import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ListRestaurantsUseCase } from '../../../application/restaurant/use-cases/restaurant/list-restaurants.use-case';
import { GetRestaurantByIdUseCase } from '../../../application/restaurant/use-cases/restaurant/get-restaurant-by-id.use-case';
import { CreateRestaurantUseCase } from '../../../application/restaurant/use-cases/restaurant/create-restaurant.use-case';
import { UpdateRestaurantUseCase } from '../../../application/restaurant/use-cases/restaurant/update-restaurant.use-case';
import { DeleteRestaurantUseCase } from '../../../application/restaurant/use-cases/restaurant/delete-restaurant.use-case';
import { RestaurantDto } from '../dtos/restaurant.dto';

@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly listRestaurants: ListRestaurantsUseCase,
    private readonly getRestaurantById: GetRestaurantByIdUseCase,
    private readonly createRestaurant: CreateRestaurantUseCase,
    private readonly updateRestaurant: UpdateRestaurantUseCase,
    private readonly deleteRestaurant: DeleteRestaurantUseCase,
  ) {}

  @Get()
  async list() {
    return this.listRestaurants.execute();
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getRestaurantById.execute(id);
  }

  @Post()
  async create(@Body() dto: RestaurantDto) {
    
    const restaurantProps = {
      name: dto.name,
      description: dto.description,
      address: dto.address,
      rating: dto.rating,
    };
    return this.createRestaurant.execute(restaurantProps);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<RestaurantDto>) {
    
    const updateProps = {
      name: dto.name,
      description: dto.description,
      address: dto.address,
      rating: dto.rating,
    };
    return this.updateRestaurant.execute(id, updateProps);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteRestaurant.execute(id);
  }
}