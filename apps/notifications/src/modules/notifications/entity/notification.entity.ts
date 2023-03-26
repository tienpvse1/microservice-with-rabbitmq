import { NotificationType } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'notification' })
export class Notification extends Document {
  @Prop({ name: 'user_id' })
  userId: string;

  @Prop({
    required: true,
    default: NotificationType.USER_CREATED,
    enum: NotificationType,
    type: 'string',
  })
  type: NotificationType;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.Mixed, name: 'custom_data' })
  customData: object;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
