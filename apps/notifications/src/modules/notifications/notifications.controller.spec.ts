import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
        ClientsModule.register([
          {
            name: 'MATH_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: ['amqp://user:password@localhost:5672'],
              queue: 'cats_queue',
              noAck: false,
              queueOptions: {
                durable: false,
              },
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
