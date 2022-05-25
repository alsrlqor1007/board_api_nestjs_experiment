import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class PostDto {
    @IsNumber()
    @IsNotEmpty()
    writer_id: number;

    @IsString()
    @IsNotEmpty()
    text: string;

    // @IsString()
    // @IsNotEmpty()
    // accessToken: string;
}

export class PatchDto {
    @IsNumber()
    @IsNotEmpty()
    post_id: number;

    @IsString()
    @IsNotEmpty()
    text: string;

    // @IsString()
    // @IsNotEmpty()
    // accessToken: string;
}