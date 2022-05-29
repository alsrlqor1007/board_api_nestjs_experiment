import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import config from './configs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config]
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    PostModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
