import { NestFactory } from '@nestjs/core';
import { TemplateApiModule } from './template-api.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(TemplateApiModule);
  const swagger = new DocumentBuilder()
    .setTitle('Template example')
    .setDescription('The template API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('api', app, documentFactory);

  app.setGlobalPrefix('api/v1');

  const config = app.get(ConfigService);
  await app.listen(config.get('PORT_HTTP_API') ?? 3000,
    () => { console.log(`Server listening port ${config.get('PORT_HTTP_API')}`) });
}
bootstrap();
