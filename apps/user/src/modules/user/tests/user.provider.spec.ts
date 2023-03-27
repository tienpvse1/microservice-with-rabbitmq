import { USER_REPOSITORY, UserProvider } from '../user.provider';
import { DATA_SOURCE } from '../../../database/database.provider';
import { DataSource } from 'typeorm';
describe('UserProvider', () => {
  const mockDataSource = {
    getRepository: jest.fn(),
  };
  it('should be defined', () => {
    expect(UserProvider).toBeDefined();
  });

  it('should contains appropriate values', () => {
    expect(UserProvider.provide).toBe(USER_REPOSITORY);
    expect(UserProvider.inject).toMatchObject([DATA_SOURCE]);
    expect(typeof UserProvider.useFactory).toBe('function');
  });
  it('call get repository function', async () => {
    UserProvider.useFactory(mockDataSource as unknown as DataSource);
    expect(mockDataSource.getRepository).toHaveBeenCalled();
  });
});
