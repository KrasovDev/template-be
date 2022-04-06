import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DBService } from './db.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // app.use(helmet.contentSecurityPolicy());
  // app.use(helmet.crossOriginEmbedderPolicy());
  // app.use(helmet.crossOriginOpenerPolicy());
  // app.use(helmet.crossOriginResourcePolicy());
  app.use(helmet.dnsPrefetchControl());
  // app.use(helmet.expectCt());
  app.use(helmet.frameguard());
  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts());
  app.use(helmet.ieNoOpen());
  app.use(helmet.noSniff());
  // app.use(helmet.originAgentCluster());
  // app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.referrerPolicy());
  app.use(helmet.xssFilter());

  const config = new DocumentBuilder()
    .setTitle('BEANSTOX backoffice proxy service')
    .setDescription('The API description')
    .setVersion('0.1')
    .build();

  // Bootstrap swagger documentation
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Attach app close events to correctly close db connection
  const prismaService = app.get(DBService);
  await prismaService.enableShutdownHooks(app);

  await app.listen(3000);
}

bootstrap();
