import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsService } from './notifications.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entity/notification.entity';

describe('NotificationsController', () => {
  let service: NotificationsService;
  const mockClientProxy = {
    emit: jest.fn(),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [NotificationsService],
      imports: [
        MongooseModule.forFeature([
          { name: Notification.name, schema: NotificationSchema },
        ]),
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
      .overrideProvider('MATH_SERVICE')
      .useValue(mockClientProxy)
      .compile();

    service = app.get(NotificationsService);
  });

  describe('root', () => {
    it('should push new message to queue', () => {
      service.getHello();
      expect(mockClientProxy.emit).toHaveBeenCalledTimes(1);
    });
  });
});
