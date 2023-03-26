import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { AvailableQueue } from '@app/common/enum/available-queue.enum';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      queue: AvailableQueue.NOTIFICATION_QUEUE,
      noAck: false,
      urls: [config.getOrThrow<string>('rabbitmq.connectionUrl')],
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.startAllMicroservices();
  await app.listen(config.getOrThrow<number>('notificationService.port'));
}
bootstrap();
