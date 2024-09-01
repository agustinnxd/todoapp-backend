import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { BadRequestException, HttpException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TodoApp API')
    .setDescription('Endpoints de autenticación y registro de usuarios, y CRUD de tareas')
    .setVersion('1.0')
    .addTag('TodoApp')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document)

  app.enableCors({origin: 'http://localhost:5173', credentials: true});
  app.setGlobalPrefix('api');
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ stopAtFirstError: true })
  );
  await app.listen(3000);
}
bootstrap();
