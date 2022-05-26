import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { getEnabledCategories } from 'trace_events';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('board_api_mingi')
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
  
  await app.listen(3000);
}
bootstrap();
