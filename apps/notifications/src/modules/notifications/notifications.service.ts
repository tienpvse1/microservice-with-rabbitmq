import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationsService {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}
  getHello() {
    this.client.emit('sum', [1, 2, 3, 4, 5]);
  }
}
