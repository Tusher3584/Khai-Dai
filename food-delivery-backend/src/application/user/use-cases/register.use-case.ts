import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../../../domain/user/repositories/user.repository';
import { User } from '../../../domain/user/entities/user.entity';
import { v4 as uuid } from 'uuid';
import { IHashService } from '../../../domain/user/services/hash.service';
import { IJwtService } from '../../../domain/user/services/jwt.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredEvent } from '../../../domain/user/events/user-registered.event';

@Injectable()
export class RegisterUseCase {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
    @Inject('IHashService') private readonly hashService: IHashService,
    @Inject('IJwtService') private readonly jwtService: IJwtService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  async execute(userProps: { email: string; password: string; name?: string; role?: 'Customer' | 'Admin' | 'Delivery' }): Promise<User> {
    const hashedPassword = await this.hashService.hash(userProps.password);

    const user = new User(
      uuid(),
      userProps.email,
      hashedPassword,
      userProps.role ?? 'Customer',
      userProps.name
    );

    const createdUser = await this.userRepo.create(user);

    // Emit event instead of directly creating the cart
    this.eventEmitter.emit(
      'user.registered',
      new UserRegisteredEvent(createdUser.id)
    );

    return createdUser;
  }
}
