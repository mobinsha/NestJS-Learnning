import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

export enum UserPermission {
  ADMIN = 'admin',
  OWNER = 'owner',
  USER = 'user',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ length: 50, nullable: false })
  userName: string;

  @Index({ unique: true })
  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ length: 50, nullable: true })
  firstName: string;

  @Column({ length: 50, nullable: true })
  lastName: string;

  @Column({
    type: 'enum',
    enum: UserPermission,
    default: UserPermission.USER,
  })
  permission: UserPermission;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
