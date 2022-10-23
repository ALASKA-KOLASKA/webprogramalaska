import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {ValidationPipe} from "@nestjs/common";
import {BadRequestExceptionFilter} from "./filters/BadRequestExceptionFilter.filter";
import {NotFoundExceptionFilter} from "./filters/NotFoundExceptionFilter.filter";
import {ForbiddenExceptionFilter} from "./filters/ForbiddenExceptionFilter.filter";
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe())

  const cookieParser = require("cookie-parser");
  app.use(cookieParser());

  app.useGlobalFilters(
      new BadRequestExceptionFilter(),
      new ForbiddenExceptionFilter(),
      new NotFoundExceptionFilter()
  )

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('pug');


  const port = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Сервис для автоматизации мероприятий ИТМО')
    .setDescription('API для сервисов менеджмента участников, выступлений и реквизита',
    )
      .addCookieAuth("auth_token")
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const prismaService = app.get<PrismaService>(PrismaService);
  await prismaService.enableShutdownHooks(app);


  app.listen(port, function () {
    console.log(`Example app listening on ${port}!`);
  });
}
bootstrap();
