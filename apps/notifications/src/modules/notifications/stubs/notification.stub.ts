import { CreateNotificationDto } from '../dto/create-notification.dto';

export const notificationStub = (): CreateNotificationDto => ({
  userId: 'random-id',
  title: 'random-title',
  description: 'random-description',
  customData: {
    data: 'radom-data',
  },
});

export const createdNotificationStub = () => ({
  id: 'random-id',
  userId: 'random-id',
  title: 'random-title',
  description: 'random-description',
  customData: {
    data: 'radom-data',
  },
});
