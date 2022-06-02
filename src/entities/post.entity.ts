import { User } from "src/entities/user.entity";
import { Comment } from "src/entities/comment.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('Post')
export class Post {
    @PrimaryGeneratedColumn()
    post_id: number;

    @Column({ type: 'int' })
    writer_id: number;

    @Column({ type: 'varchar' })
    text: string;

    @CreateDateColumn({ type: 'timestamp' })
    create_date_time: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    update_date_time: Date;

    @DeleteDateColumn({ type: 'timestamp', nullable: true })
    deleted_date_time: Date;

    @ManyToOne(() => User, user => user.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'writer_id', referencedColumnName: 'user_id' })
    user: User;

    @OneToMany(() => Comment, comment => comment.commented_post_id, { cascade: true })
    comments: Comment[];
}