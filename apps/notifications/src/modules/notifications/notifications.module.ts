import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationSchema } from './entity/notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'MATH_SERVICE',
        useFactory: (config: ConfigService) => {
          return {
            name: 'MATH_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [config.getOrThrow<string>('rabbitmq.connectionUrl')],
              queue: 'cats_queue',
              noAck: false,
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
    MongooseModule.forFeature([
      { name: Notification.name, schema: NotificationSchema },
    ]),
  ],
})
export class NotificationsModule {}
