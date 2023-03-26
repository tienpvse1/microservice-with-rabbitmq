import { Module, Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AvailableQueue } from '@app/common/enum/available-queue.enum';
import { AvailableService } from '@app/common/enum/available-service.enum';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
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
  providers: [UserService, Logger],
})
export class UserModule {}
