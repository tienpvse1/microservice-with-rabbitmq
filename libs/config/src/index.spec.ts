import config from '@app/config';
import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();
describe('application config', () => {
  it('should be defined', () => {
    expect(config).toBeDefined();
  });
  it('should contains enough props', () => {
    const configInstance = config();
    expect(configInstance.rabbitmq.connectionUrl).toBeDefined();
    expect(configInstance.jwt.kid).toBeDefined();
    expect(configInstance.notificationDatabase.connectionUrl).toBeDefined();
    expect(configInstance.notificationDatabase.password).toBeDefined();
    expect(configInstance.notificationDatabase.username).toBeDefined();
    expect(configInstance.notificationService.port).toBeDefined();
    expect(configInstance.userDatabase.host).toBeDefined();
    expect(configInstance.userDatabase.name).toBeDefined();
    expect(configInstance.userDatabase.password).toBeDefined();
    expect(configInstance.userDatabase.username).toBeDefined();
    expect(configInstance.userService.port).toBeDefined();
  });
});
