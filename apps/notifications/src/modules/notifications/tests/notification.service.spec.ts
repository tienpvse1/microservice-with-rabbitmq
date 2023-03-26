import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { mockNotificationModel } from '../__mocks__/notification.model';
import { Notification } from '../entity/notification.entity';
import { NotificationsService } from '../notifications.service';
import {
  notificationStub,
  createdNotificationStub,
} from '../stubs/notification.stub';
import { Model } from 'mongoose';

describe('NotificationsController', () => {
  let service: NotificationsService;
  let model: Model<Notification>;
  const mockClientProxy = {
    emit: jest.fn(),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getModelToken(Notification.name),
          useValue: mockNotificationModel,
        },
        {
          provide: 'MATH_SERVICE',
          useValue: mockClientProxy,
        },
      ],
    })
      .overrideProvider('MATH_SERVICE')
      .useValue(mockClientProxy)
      .compile();

    service = app.get(NotificationsService);
    model = app.get(getModelToken(Notification.name));
  });

  describe('root', () => {
    it('should push new message to queue', () => {
      service.getHello();
      expect(mockClientProxy.emit).toHaveBeenCalledTimes(1);
    });
  });
  describe('create', () => {
    it('should call the mongoose create function', async () => {
      const dto = notificationStub();
      const result = await service.create(dto);
      expect(model.create).toHaveBeenCalledWith(dto);
      expect(result).toMatchObject(createdNotificationStub());
    });
  });
});
