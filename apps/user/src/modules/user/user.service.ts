import { AvailableService } from '@app/common/enum/available-service.enum';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
@Injectable()
export class UserService {
  constructor(
    @Inject(AvailableService.NOTIFICATION_SERVICE) private client: ClientProxy,
    @InjectRepository(User) private repository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World from user service!';
  }

  async create(dto: CreateUserDto) {
    try {
      const createdUser = await this.repository.save(dto);
      this.client.emit('user_created', {
        title: 'new user has been created',
        customData: {
          user_id: createdUser.id,
        },
      });
      return createdUser;
    } catch (error) {
      throw new BadRequestException('cannot create user');
    }
  }
}
