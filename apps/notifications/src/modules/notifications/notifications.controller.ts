import { Controller, Get, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notification')
export class NotificationsController {
  private logger = new Logger();
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  getHello() {
    this.notificationsService.getHello();
    return { message: 'sent' };
  }

  @MessagePattern('user_created')
  create(@Payload() dto: CreateNotificationDto, @Ctx() context: RmqContext) {
    this.logger.debug(dto);
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);
    return this.notificationsService.create(dto);
  }
}
