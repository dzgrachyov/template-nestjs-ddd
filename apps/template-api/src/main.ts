import { NestFactory } from '@nestjs/core';
import { TemplateApiModule } from './template-api.module';

async function bootstrap() {
  const app = await NestFactory.create(TemplateApiModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
