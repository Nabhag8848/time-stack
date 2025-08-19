import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity({ name: 'task', schema: 'core' })
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workspace_id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'workspace_id' })
  user: User;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'boolean' })
  is_billable: boolean;

  @ManyToOne(() => Project, (project) => project.tasks)
  @JoinColumn({ name: 'project_id', referencedColumnName: 'id' })
  project: Project;
}
