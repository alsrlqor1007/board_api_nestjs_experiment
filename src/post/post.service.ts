import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { PatchDto, PostDto } from './post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostRepository)
        private postRepository: PostRepository,
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async createPost(postDto: PostDto): Promise<object> {
        const { writer_id, text } = postDto;
        const writerinfo = await this.userRepository.findOne({ where: { user_id: writer_id }});

        if (!writerinfo) throw new NotFoundException('Not valid user');
        else {
            const result = await this.postRepository.save({ writer_id, text });

            return {
                post_id: result.post_id,
                message: 'Created new post'
            }
        }
    }

    async getPostById(id): Promise<object> {
        const result = await this.postRepository.findOne({ where: { post_id: id }});

        if (!result) throw new NotFoundException('Not valid post id');
        else {
            const { post_id, writer_id, text, update_date_time, deleted_date_time } = result;
            const writer = (await this.userRepository.findOne({ where: { user_id: writer_id } })).nickname;

            return {
                data: {
                    post_id,
                    writer_id,
                    writer,
                    text,
                    update_date_time
                },
                message: 'Post information'
            }
        }
    }

    async modifyPost(patchDto: PatchDto) {
        const result = await this.postRepository.findOne({ where: { post_id: patchDto.post_id }});
        

        if (!result) throw new NotFoundException('Not valid post id');
        else {
            const { post_id, writer_id, text, update_date_time, deleted_date_time } = result;
            await this.postRepository.update({ text }, { text: patchDto.text });
            return this.getPostById(patchDto.post_id);
        }
    }

    async deletePost(post_id, writer_id) {
        const result = await this.postRepository.findOne({ where: { post_id }});   

        if (!result) throw new NotFoundException('Not valid post id');
        else if (result.writer_id !== writer_id) throw new BadRequestException('Not the writer of the post');
        else {
            await this.postRepository.softDelete(post_id);

            return {
                message: 'Deleted the post'
            }
        }
    }
}
