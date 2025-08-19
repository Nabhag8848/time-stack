import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Client } from './client.entity';
import { Project } from './project.entity';
import { Task } from './task.entity';
import { Tag } from './tag.entity';

@Entity({
  name: 'user',
  schema: 'core',
})
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  profile_picture: string;

  @Column({ type: 'uuid', unique: true, default: () => 'gen_random_uuid()' })
  workspace_id: string;

  @OneToMany(() => Client, (client) => client.user)
  clients: Client[];

  @OneToMany(() => Project, (project) => project.user)
  projects: Project[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @OneToMany(() => Tag, (tag) => tag.user)
  tags: Tag[];
}
