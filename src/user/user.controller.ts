import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Post('/signup')
    @HttpCode(201)
    @ApiOperation({ summary: '회원가입', description: 'nickname과 password만 입력'})
    async signup(@Body() userDto: UserDto): Promise<object> {
        return this.userService.signup(userDto);
    }
    
    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: '로그인', description: 'nickname과 password만 입력'})
    async login(@Body() userDto: UserDto): Promise<object> {
        return this.userService.login(userDto);
    }

    // @Post('/logout')
    // @HttpCode(200)
    // async logout(@Body() id): Promise<object> {
    //     return this.userService.logout(id);
    // }

    // @Post('/withdrawal')
    // @HttpCode(200)
    // async withdrawal(@Body() id: number): Promise<object> {
    //     return this.userService.withdrawal(id);
    // }
}
