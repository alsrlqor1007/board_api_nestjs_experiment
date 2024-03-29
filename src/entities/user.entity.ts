import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ type: 'varchar', unique: true })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  create_date_time: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  update_date_time: Date;

  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deleted_date_time: Date;

  @OneToMany(() => Post, (post) => post.writer_id, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.commenter_id, {
    cascade: true,
  })
  comments: Comment[];
}
