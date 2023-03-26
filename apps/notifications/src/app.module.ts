import config from '@app/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from './modules/notifications/notifications.module';
@Module({
  imports: [
    NotificationsModule,
    ConfigModule.forRoot({
      load: [config],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          uri: config.getOrThrow('notificationDatabase.connectionUrl'),
          authSource: 'admin',
          user: config.getOrThrow('notificationDatabase.username'),
          pass: config.getOrThrow('notificationDatabase.password'),
        };
      },
    }),
  ],
})
export class AppModule {}
