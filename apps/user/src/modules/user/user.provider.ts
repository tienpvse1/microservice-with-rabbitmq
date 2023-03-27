import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../../database/database.provider';
import { User } from './entities/user.entity';
export const USER_REPOSITORY = 'USER_REPOSITORY';
export const UserProvider = {
  provide: USER_REPOSITORY,
  inject: [DATA_SOURCE],
  useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
};
