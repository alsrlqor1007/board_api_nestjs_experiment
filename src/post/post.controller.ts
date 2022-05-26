import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { PatchDto, PostDto } from './post.dto';
import { createPostDto, createPostFailDto, deletePostDto, deletePostFailDto, getPostDto, getPostFailDto, modifyPostDto, modifyPostFailDto } from './post.response';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: '게시글 작성 및 등록' })
    @ApiCreatedResponse({ status: 201, description: "게시글 등록", type: createPostDto })
    @ApiNotFoundResponse({ status: 404, description: "게시물 등록 실패(존재하지 않는 계정)", type: createPostFailDto })
    async createPost(@Body() postDto: PostDto): Promise<object> {
        return this.postService.createPost(postDto);       
    }

    @Get()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 조회' })
    @ApiOkResponse({ status: 200, description: "게시글 조회", type: getPostDto })
    @ApiNotFoundResponse({ status: 404, description: "게시물 조회 실패(존재하지 않는 게시물 id)", type: getPostFailDto })
    async getPostById(@Query('id', ParseIntPipe) post_id: number): Promise<object> {
        return this.postService.getPostById(post_id);
    }

    @Patch()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 수정' })
    @ApiOkResponse({ status: 200, description: "게시글 수정", type: modifyPostDto })
    @ApiNotFoundResponse({ status: 404, description: "게시물 조회 실패(존재하지 않는 게시물 id)", type: modifyPostFailDto })
    async modifyPost(@Body() patchDto: PatchDto) {
        return this.postService.modifyPost(patchDto); 
    }

    @Delete()
    @HttpCode(200)
    @ApiOperation({ summary: '게시글 삭제', description: 'Soft Delete 방식으로 게시글 삭제' })
    @ApiOkResponse({ status: 200, description: "게시글 삭제", type: deletePostDto })
    @ApiNotFoundResponse({ status: 404, description: "게시물 조회 실패(존재하지 않는 게시물 id)", type: deletePostFailDto })
    @ApiBadRequestResponse({ status: 400, description: "게시물 조회 실패(작성자만 삭제 가능)", type: deletePostFailDto })
    async deletePost(
        @Query('id', ParseIntPipe) post_id: number,
        @Query('writer', ParseIntPipe) writer_id: number
    ) {
        return this.postService.deletePost(post_id, writer_id);
    }
}
