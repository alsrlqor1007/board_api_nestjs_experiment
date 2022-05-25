import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) {}

    async signup(userDto: UserDto): Promise<object> {
        const { nickname, password } = userDto;
        const isValid = await this.userRepository.findOne({ where: { nickname } });

        if (isValid) throw new BadRequestException('Nickname in use');
        else {
            const result = this.userRepository.createUser(userDto);

            return {
                data: (await result).nickname,
                message: 'Created new user'
            }
        };
    }

    async login(userDto: UserDto): Promise<object> {
        const { nickname, password } = userDto;

        const userinfo = await this.userRepository.findOne({ where: { nickname }});
        if (!userinfo) throw new NotFoundException(`No users with ${nickname}`);
        
        const passwordValidity = await bcrypt.compare(password, userinfo.password);
        if (!passwordValidity) throw new BadRequestException('Wrong password');
        else {
            const accessToken = this.jwtService.sign({ nickname }, { expiresIn: '1h' });

            return {
                data: {
                    user_id: userinfo.user_id,
                    nickname: userinfo.nickname,
                    accessToken
                },
                message: 'Login success'
            }
        }
    }

    async logout(id) {
        
    }

    async withdrawal(id) {
        
    }
}
