import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { ListMenuItemsByRestaurantUseCase } from '../../../application/restaurant/use-cases/menu-item/list-menu-items-by-restaurant.use-case';
import { GetMenuItemByIdUseCase } from '../../../application/restaurant/use-cases/menu-item/get-menu-item-by-id.use-case';
import { CreateMenuItemUseCase } from '../../../application/restaurant/use-cases/menu-item/create-menu-item.use-case';
import { UpdateMenuItemUseCase } from '../../../application/restaurant/use-cases/menu-item/update-menu-item.use-case';
import { DeleteMenuItemUseCase } from '../../../application/restaurant/use-cases/menu-item/delete-menu-item.use-case';
import { MenuItemDto } from '../dtos/menu-item.dto';

@Controller('restaurants/:restaurantId/menu-items')
export class MenuItemController {
  constructor(
    private readonly listMenuItems: ListMenuItemsByRestaurantUseCase,
    private readonly getMenuItemById: GetMenuItemByIdUseCase,
    private readonly createMenuItem: CreateMenuItemUseCase,
    private readonly updateMenuItem: UpdateMenuItemUseCase,
    private readonly deleteMenuItem: DeleteMenuItemUseCase,
  ) {}

  @Get()
  async list(@Param('restaurantId') restaurantId: string) {
    return this.listMenuItems.execute(restaurantId);
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    return this.getMenuItemById.execute(id);
  }

  @Post()
  async create(@Param('restaurantId') restaurantId: string, @Body() dto: MenuItemDto) {
    
    const menuItemProps = {
      restaurantId,
      name: dto.name,
      description: dto.description,
      price: dto.price,
    };
    return this.createMenuItem.execute(menuItemProps);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: Partial<MenuItemDto>) {
    
    const updateProps = {
      name: dto.name,
      description: dto.description,
      price: dto.price,
    };
    return this.updateMenuItem.execute(id, updateProps);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.deleteMenuItem.execute(id);
  }
}