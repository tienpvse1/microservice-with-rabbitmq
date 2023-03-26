import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotificationDto } from './dto/create-notification.dto';
import {
  Notification,
  NotificationDocument,
} from './entity/notification.entity';
@Injectable()
export class NotificationsService {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy,
    @InjectModel(Notification.name) private model: Model<NotificationDocument>,
  ) {}
  getHello() {
    this.client.emit('sum', [1, 2, 3, 4, 5]);
  }

  create(dto: CreateNotificationDto) {
    return this.model.create(dto);
  }
}
