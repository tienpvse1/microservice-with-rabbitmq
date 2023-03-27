import { AvailableQueue } from '@app/common/enum/available-queue.enum';
import { AvailableService } from '@app/common/enum/available-service.enum';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '../../database/database.module';
import { UserController } from './user.controller';
import { UserProvider } from './user.provider';
import { UserService } from './user.service';
@Module({
  imports: [
    DatabaseModule,
    ClientsModule.registerAsync([
      {
        name: AvailableService.NOTIFICATION_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              queue: AvailableQueue.NOTIFICATION_QUEUE,
              noAck: false,
              urls: [config.getOrThrow<string>('rabbitmq.connectionUrl')],
              queueOptions: {
                durable: false,
              },
            },
          };
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, Logger, UserProvider],
})
export class UserModule {}
