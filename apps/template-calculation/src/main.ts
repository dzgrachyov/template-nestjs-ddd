import { NestFactory } from '@nestjs/core';
import { TemplateCalculationModule } from './template-calculation.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TemplateCalculationModule,
    {
      transport: Transport.TCP,
      options: {
        port: process.env.PORT ? +process.env.PORT : 3001,
      },
    },
  );
  await app.listen();
}
bootstrap();
