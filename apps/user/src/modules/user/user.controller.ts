import { Controller, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private logger: Logger,
  ) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }

  @MessagePattern('sum')
  sum(@Payload() data: number[], @Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return data.reduce((prev, curr) => prev + curr);
  }
}
