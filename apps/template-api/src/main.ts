import { NestFactory } from '@nestjs/core';
import { TemplateApiModule } from './template-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(TemplateApiModule);
  const config = new DocumentBuilder()
    .setTitle('Template example')
    .setDescription('The template API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api/v1');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
