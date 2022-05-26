import { ApiProperty } from "@nestjs/swagger";

export class signupDataDto {
    @ApiProperty({
        description: 'user id'
    })
    user_id: number;

    @ApiProperty({
        description: 'nickname'
    })
    nickname: string;

    @ApiProperty({
        description: 'access token'
    })
    access_token: string;
}

export class signupSuccessDto {
    @ApiProperty({
        description: 'nickname'
    })
    nickname: string;

    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class signupFailDto {
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

export class loginDataDto {
    @ApiProperty({
        description: 'user id'
    })
    user_id: number;

    @ApiProperty({
        description: 'nickname'
    })
    nickname: string;

    @ApiProperty({
        description: 'access token'
    })
    access_token: string;
}

export class loginSuccessDto {
    @ApiProperty({
        description: 'nickname'
    })
    data: loginDataDto;

    @ApiProperty({
        description: 'success message'
    })
    message: string;
}

export class loginFailDto {
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