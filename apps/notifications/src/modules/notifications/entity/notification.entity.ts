import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export enum NotificationType {
  USER_CREATED = 'user_created',
}

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'notification' })
export class Notification extends Document {
  @Prop({ name: 'user_id' })
  userId: string;

  @Prop()
  type: NotificationType;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: 'json', name: 'custom_data' })
  customData: object;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
