export default () => ({
  rabbitmq: {
    connectionUrl: process.env.RABBITMQ_CONNECTION_URL,
  },
  userService: {
    port: process.env.NESTJS_USER_PORT,
  },
  notificationService: {
    port: process.env.NESTJS_NOTIFICATION_PORT,
  },
  jwt: {
    kid: process.env.NESTJS_JWT_KID,
  },

  userDatabase: {
    host: process.env.NESTJS_USER_DATABASE_HOST,
    name: process.env.USER_DATABASE_NAME,
    username: process.env.USER_DATABASE_USERNAME,
    password: process.env.USER_DATABASE_PASSWORD,
  },

  notificationDatabase: {
    connectionUrl: process.env.NESTJS_NOTIFICATION_DATABASE_CONNECTION_URL,
    username: process.env.NOTIFICATION_DATABASE_USERNAME,
    password: process.env.NOTIFICATION_DATABASE_PASSWORD,
  },
});
