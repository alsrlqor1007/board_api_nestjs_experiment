import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { UserDto } from './user.dto';
import {
  loginFailDto,
  loginSuccessDto,
  signupFailDto,
  signupSuccessDto,
} from './user.response';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/signup')
  @HttpCode(201)
  @ApiOperation({
    summary: '회원가입',
    description: 'nickname과 password만 입력',
  })
  @ApiCreatedResponse({
    status: 201,
    description: '회원가입 성공',
    type: signupSuccessDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '회원가입 실패(닉네임 중복)',
    type: signupFailDto,
  })
  async signup(@Body() userDto: UserDto): Promise<object> {
    return this.userService.signup(userDto);
  }

  @Post('/login')
  @HttpCode(200)
  @ApiOperation({
    summary: '로그인',
    description: 'nickname과 password만 입력',
  })
  @ApiOkResponse({
    status: 200,
    description: '로그인 성공',
    type: loginSuccessDto,
  })
  @ApiNotFoundResponse({
    status: 404,
    description: '로그인 실패(존재하지 않는 계정)',
    type: loginFailDto,
  })
  @ApiBadRequestResponse({
    status: 400,
    description: '로그인 실패(잘못된 비밀번호)',
    type: loginFailDto,
  })
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
