import { Module } from '@nestjs/common';
import { RestaurantController } from './controllers/restaurant.controller';
import { MenuItemController } from './controllers/menu-item.controller';
import { ListRestaurantsUseCase } from '../../application/restaurant/use-cases/restaurant/list-restaurants.use-case';
import { GetRestaurantByIdUseCase } from '../../application/restaurant/use-cases/restaurant/get-restaurant-by-id.use-case';
import { CreateRestaurantUseCase } from '../../application/restaurant/use-cases/restaurant/create-restaurant.use-case';
import { UpdateRestaurantUseCase } from '../../application/restaurant/use-cases/restaurant/update-restaurant.use-case';
import { DeleteRestaurantUseCase } from '../../application/restaurant/use-cases/restaurant/delete-restaurant.use-case';
import { ListMenuItemsByRestaurantUseCase } from '../../application/restaurant/use-cases/menu-item/list-menu-items-by-restaurant.use-case';
import { GetMenuItemByIdUseCase } from '../../application/restaurant/use-cases/menu-item/get-menu-item-by-id.use-case';
import { CreateMenuItemUseCase } from '../../application/restaurant/use-cases/menu-item/create-menu-item.use-case';
import { UpdateMenuItemUseCase } from '../../application/restaurant/use-cases/menu-item/update-menu-item.use-case';
import { DeleteMenuItemUseCase } from '../../application/restaurant/use-cases/menu-item/delete-menu-item.use-case';
import { RestaurantRepositoryImpl } from '../../infrastructure/restaurant/restaurant.repository.impl';
import { MenuItemRepositoryImpl } from '../../infrastructure/restaurant/menu-item.repository.impl';
import { PrismaService } from '../../infrastructure/database/prisma.service';

@Module({
  controllers: [RestaurantController, MenuItemController],
  providers: [
    PrismaService,
    
    ListRestaurantsUseCase,
    GetRestaurantByIdUseCase,
    CreateRestaurantUseCase,
    UpdateRestaurantUseCase,
    DeleteRestaurantUseCase,
    
    ListMenuItemsByRestaurantUseCase,
    GetMenuItemByIdUseCase,
    CreateMenuItemUseCase,
    UpdateMenuItemUseCase,
    DeleteMenuItemUseCase,
    
    {
      provide: 'IRestaurantRepository',
      useClass: RestaurantRepositoryImpl,
    },
    {
      provide: 'IMenuItemRepository',
      useClass: MenuItemRepositoryImpl,
    },
  ],
})
export class RestaurantModule {}