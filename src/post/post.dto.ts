import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class PostDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: '1',
        description: 'writer user_id',
        required: true
    })
    writer_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'post example. texts are allowed',
        description: 'The text of the post',
        required: true
    })
    text: string;

    // @IsString()
    // @IsNotEmpty()
    // accessToken: string;
}

export class PatchDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({
        example: '1',
        description: 'post_id',
        required: true
    })
    post_id: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'post example. texts are allowed',
        description: 'Updated text of the post',
        required: true
    })
    text: string;

    // @IsString()
    // @IsNotEmpty()
    // accessToken: string;
}