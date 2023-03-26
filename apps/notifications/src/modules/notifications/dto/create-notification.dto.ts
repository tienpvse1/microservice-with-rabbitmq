import { NotificationType } from '@app/common';

export class CreateNotificationDto {
  userId: string;
  type?: NotificationType;
  title: string;
  description: string;
  customData: object;
}
