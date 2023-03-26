import { RmqContext } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { NotificationsController } from '../notifications.controller';
import { NotificationsService } from '../notifications.service';
import {
  createdNotificationStub,
  notificationStub,
} from '../stubs/notification.stub';

jest.mock('../notifications.service.ts');
describe('NotificationsController', () => {
  let notificationsController: NotificationsController;
  let service: NotificationsService;
  const message = { random: 'message' };
  const mockRmqContext = {
    getChannelRef: jest.fn().mockReturnValue({ ack: jest.fn() }),
    getMessage: jest.fn().mockReturnValue(message),
  };
  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NotificationsController],
      providers: [NotificationsService],
      imports: [],
    }).compile();

    notificationsController = app.get<NotificationsController>(
      NotificationsController,
    );
    service = app.get(NotificationsService);
    // jest.clearAllMocks();
  });

  describe('root', () => {
    it('should return message object', () => {
      expect(notificationsController.getHello()).toMatchObject({
        message: 'sent',
      });
      expect(service.getHello).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should call all the appropriate functions', () => {
      notificationsController.create(
        notificationStub(),
        mockRmqContext as unknown as RmqContext,
      );
      expect(mockRmqContext.getChannelRef).toBeCalled();
      expect(mockRmqContext.getMessage).toBeCalled();
      expect(mockRmqContext.getChannelRef().ack).toHaveBeenCalledWith(message);
      expect(service.create).toBeCalled();
    });
    it('should return the created notification', async () => {
      const value = await notificationsController.create(
        notificationStub(),
        mockRmqContext as unknown as RmqContext,
      );
      expect(service.create).toHaveBeenCalled();
      expect(value).toMatchObject(createdNotificationStub());
    });
  });
});
