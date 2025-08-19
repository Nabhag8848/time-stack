import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'tag', schema: 'core' })
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workspace_id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'workspace_id' })
  user: User;

  @Column({ type: 'varchar', length: 20 })
  name: string;
}
