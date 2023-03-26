import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationSchema } from './entity/notification.entity';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  const mockService = {
    getHello: jest.fn(),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService],
      imports: [
        MongooseModule.forFeature([
          { name: Notification.name, schema: NotificationSchema },
        ]),
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
      ],
    })
      .overrideProvider(NotificationsService)
      .useValue(mockService)
      .compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
  });

  describe('root', () => {
    it('should return message object', () => {
      expect(notificationsController.getHello()).toMatchObject({
        message: 'sent',
      });
      expect(mockService.getHello).toHaveBeenCalled();
    });
  });
});
