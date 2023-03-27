import { BaseEntity } from '../../../base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
export enum AvailableRole {
  USER = 'user',
  ADMINISTRATOR = 'administrator',
}
@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'enum', enum: AvailableRole })
  name: AvailableRole;
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
