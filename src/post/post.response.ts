import { ApiProperty } from "@nestjs/swagger";

export class createPostDto {
    @ApiProperty({
        description: 'post id 값'
    })
    post_id: number;

    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class createPostFailDto {
    @ApiProperty({
        description: 'status code'
    })
    statusCode: number;

    @ApiProperty({
        description: 'failure message'
    })
    message: string;

    @ApiProperty({
        description: 'error type'
    })
    error: string;
}

export class getPostDataDto {
    @ApiProperty({
        description: 'post id'
    })
    post_id: number;

    @ApiProperty({
        description: 'writer id'
    })
    writer_id: number;

    @ApiProperty({
        description: 'writer'
    })
    writer: string;

    @ApiProperty({
        description: 'post text'
    })
    text: string;

    @ApiProperty({
        description: 'update time'
    })
    update_date_time: Date;
}

export class getPostDto {
    @ApiProperty({
        description: 'post id 값'
    })
    data: getPostDataDto;

    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class getPostFailDto {
    @ApiProperty({
        description: 'status code'
    })
    statusCode: number;

    @ApiProperty({
        description: 'failure message'
    })
    message: string;

    @ApiProperty({
        description: 'error type'
    })
    error: string;
}

export class modifyPostDto {
    @ApiProperty({
        description: 'post id 값'
    })
    data: getPostDataDto;

    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class modifyPostFailDto {
    @ApiProperty({
        description: 'status code'
    })
    statusCode: number;

    @ApiProperty({
        description: 'failure message'
    })
    message: string;

    @ApiProperty({
        description: 'error type'
    })
    error: string;
}

export class deletePostDto {
    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class deletePostFailDto {
    @ApiProperty({
        description: 'status code'
    })
    statusCode: number;

    @ApiProperty({
        description: 'failure message'
    })
    message: string;

    @ApiProperty({
        description: 'error type'
    })
    error: string;
}