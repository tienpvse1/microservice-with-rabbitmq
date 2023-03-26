import { NotificationType } from '@app/common';

export class CreateNotificationDto {
  user_id: string;
  type: NotificationType;
  title: string;
  description: string;
  customData: object;
}
