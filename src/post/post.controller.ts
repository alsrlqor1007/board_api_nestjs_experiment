import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { PatchDto, PostDto } from './post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: '게시글 작성' })
    async createPost(@Body() postDto: PostDto): Promise<object> {
        return this.postService.createPost(postDto);       
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 조회' })
    async getPostById(@Query('id', ParseIntPipe) post_id: number): Promise<object> {
        return this.postService.getPostById(post_id);
    }

    @Patch()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 수정' })
    async modifyPost(@Body() patchDto: PatchDto) {
        return this.postService.modifyPost(patchDto); 
    }

    @Delete()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 삭제', description: 'Soft Delete 방식' })
    async deletePost(@Query('id', ParseIntPipe) post_id: number) {
        return this.postService.deletePost(post_id);
    }
}
