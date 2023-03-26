import { BaseEntity } from '../../../base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'custom_data', type: 'jsonb' })
  customData: object;
}
