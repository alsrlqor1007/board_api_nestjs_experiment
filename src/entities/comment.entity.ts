import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity('Comment')
export class Comment {
    @PrimaryGeneratedColumn()
    comment_id: number;

    @Column({ type: 'int' })
    commenter_id: number;

    @Column({ type: 'int' })
    commented_post_id: number;

    @Column({ type: 'varchar' })
    comment: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date_time: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date_time: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_date_time: Date;

    @ManyToOne(() => User, user => user.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'commenter_id', referencedColumnName: 'user_id' })
    user: User;

    @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'commented_post_id', referencedColumnName: 'post_id' })
    post: Post;
}