import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { DBService } from './db.service';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({}),
  );

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
