import { isArray } from 'class-validator';
import { DatabaseProvider } from './database.provider';
import dataSource from '@app/datasource';
jest.mock('@app/datasource');
describe('DatabaseProvider', () => {
  it('should be defined', () => {
    expect(DatabaseProvider).toBeDefined;
  });

  it('should be an array', () => {
    expect(isArray(DatabaseProvider)).toBe(true);
  });
  it('should contains one element', () => {
    expect(DatabaseProvider).toHaveLength(1);
  });
  it('first element should returns a variables has type of datasource ', () => {
    expect(DatabaseProvider).toHaveLength(1);
  });
  it('should call the initialize function', async () => {
    await DatabaseProvider[0].useFactory();
    expect(dataSource.initialize).toHaveBeenCalled();
  });
});
