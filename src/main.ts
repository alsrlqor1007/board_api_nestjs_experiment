import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ConfigService } from '@nestjs/config';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('bulletin_board_api')
    .setDescription('Board API Document by Mingi')
    .setVersion('1.0')
    .build()

  const document = SwaggerModule.createDocument(app, config);
    
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist : true, 
      forbidNonWhitelisted : true,
      transform : true
    })
  )

  const configService = app.get(ConfigService);
  const port = configService.get<string>('server.port');
  
  await app.listen(port);

  Logger.log(`Board API server running on ${port}!`);
}
bootstrap();
