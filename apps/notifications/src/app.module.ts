import config from '@app/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './modules/notifications/notifications.module';
@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.getOrThrow('notificationDatabase.connectionUrl'),
          authSource: 'admin',
          user: config.getOrThrow('notificationDatabase.username'),
          pass: config.getOrThrow('notificationDatabase.password'),
        };
      },
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        inject: [ConfigService],
        name: 'MATH_SERVICE',
        useFactory: (service: ConfigService) => {
          return {
            name: 'MATH_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [service.getOrThrow<string>('rabbitmq.connectionUrl')],
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
  ],
})
export class AppModule {}
