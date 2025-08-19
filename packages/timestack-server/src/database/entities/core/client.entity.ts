import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity({
  name: 'client',
  schema: 'core',
})
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workspace_id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'workspace_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @Column({ type: 'varchar', length: 255 })
  notes: string;

  @Column({ type: 'varchar', length: 255 })
  payment_method: string;

  @Column({ type: 'varchar', length: 320, array: true })
  emails: string[];

  @Column({ type: 'varchar', length: 255 })
  preference_channel: string;

  @OneToMany(() => Project, (project) => project.client)
  projects: Project[]
}
