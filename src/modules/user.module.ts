import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from '../user/user.controller';
import { UserRepository } from '../user/user.repository';
import { UserService } from '../user/user.service';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.dev.env'
      : process.env.NODE_ENV === 'dev'
      ? '.dev.env'
      : '.test.env',
  ),
});

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({ secret: process.env.JWT_SECRET }),
  ],
})
export class UserModule {}
