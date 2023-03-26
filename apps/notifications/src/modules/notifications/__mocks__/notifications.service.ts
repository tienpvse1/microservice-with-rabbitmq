import { createdNotificationStub } from '../stubs/notification.stub';
export const NotificationsService = jest.fn().mockReturnValue({
  getHello: jest.fn().mockReturnValue(15),
  create: jest.fn().mockResolvedValue(createdNotificationStub()),
});
