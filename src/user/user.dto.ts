import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";


export class UserDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'mingiBaek',
        description: 'nickname',
        required: true
    })
    nickname: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'password',
        description: 'password',
        required: true
    })
    password: string;
}