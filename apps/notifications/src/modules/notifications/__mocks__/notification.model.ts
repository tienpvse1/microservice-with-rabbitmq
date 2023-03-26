import { createdNotificationStub } from '../stubs/notification.stub';

export const mockNotificationModel = {
  create: jest.fn().mockResolvedValue(createdNotificationStub()),
};
