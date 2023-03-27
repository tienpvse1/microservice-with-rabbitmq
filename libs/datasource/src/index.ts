import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from '../../../apps/user/src/modules/user/entities/user.entity';
import { initdb1679909891408 } from './migrations/1679909891408-initdb';
import { removeRandomField1679909983849 } from './migrations/1679909983849-remove_random_field';
import { Role } from '../../../apps/user/src/modules/role/entities/role.entity';
import { addRoleTable1679911757236 } from './migrations/1679911757236-add_role_table';
import { addRelationBetweenRoleAndUser1679914635039 } from './migrations/1679914635039-add_relation_between_role_and_user';
import { addCustomRoleId1679914737630 } from './migrations/1679914737630-add_custom_role_id';
config();

const userDataSource = new DataSource({
  type: 'postgres',
  host: process.env.NESTJS_USER_DATABASE_HOST,
  port: 5432,
  username: process.env.USER_DATABASE_USERNAME,
  password: process.env.USER_DATABASE_PASSWORD,
  database: process.env.USER_DATABASE_NAME,
  entities: [User, Role],
  logger: 'advanced-console',
  migrations: [
    initdb1679909891408,
    removeRandomField1679909983849,
    addRoleTable1679911757236,
    addRelationBetweenRoleAndUser1679914635039,
    addCustomRoleId1679914737630,
  ],
  logging: 'all',
  synchronize: true,
});

export default userDataSource;
