import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([
      UserRepository
    ]),
    JwtModule.register({ secret: process.env.JWT_SECRET })
  ]
})
export class UserModule {}
