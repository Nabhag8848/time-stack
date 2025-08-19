import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './user.entity';
import { Client } from './client.entity';
import { Task } from './task.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'project', schema: 'core' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.workspace_id, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'workspace_id', referencedColumnName: 'workspace_id' })
  user: User;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'float', nullable: true })
  hourly_rate: number;

  @ManyToOne(() => Client, (client) => client.projects, {
    createForeignKeyConstraints: true,
  })
  @JoinColumn({ name: 'client_id', referencedColumnName: 'id' })
  client: Client;

  @OneToMany(() => Task, (task) => task.project, {
    createForeignKeyConstraints: true,
  })
  tasks: Task[];

  @ManyToMany(() => Tag, (tag) => tag.projects)
  @JoinTable({
    name: 'project_tag',
    schema: 'core',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tag_id', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
