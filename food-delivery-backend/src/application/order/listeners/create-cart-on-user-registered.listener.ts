import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../../../domain/user/events/user-registered.event';
import { CreateCartUseCase } from '../use-cases/create-cart.use-case';

@Injectable()
export class CreateCartOnUserRegisteredListener {
  private readonly logger = new Logger(CreateCartOnUserRegisteredListener.name);

  constructor(private readonly createCartUseCase: CreateCartUseCase) {}

  @OnEvent('user.registered')
  async handleUserRegistered(event: UserRegisteredEvent) {
    this.logger.debug(`UserRegisteredEvent received for userId: ${event.userId}`);
    console.log('🔔 Event user.registered triggered with userId:', event.userId);

    try {
      await this.createCartUseCase.execute(event.userId);
      this.logger.debug(`Cart successfully created for userId: ${event.userId}`);
      console.log('🛒 Cart created successfully for user:', event.userId);
    } catch (error) {
      this.logger.error(`Failed to create cart for userId: ${event.userId}`, error.stack);
      console.error('❌ Failed to create cart:', error);
    }
  }
}
