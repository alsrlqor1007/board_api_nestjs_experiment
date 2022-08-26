import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'prod'
      ? '.prod.env'
      : process.env.NODE_ENV === 'test'
      ? '.test.env'
      : '.dev.env',
  ),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('bulletin_board_api')
    .setDescription('Board API Document by Mingi')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.SERVER_PORT);
  Logger.log(`ENVIRONMENT ${process.env.NODE_ENV}!`);
  Logger.log(`DB PORT ${process.env.DATABASE_PORT}!`);
  Logger.log(`Board API server running on ${process.env.SERVER_PORT}!`);
}

bootstrap();
