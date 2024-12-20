import { NestFactory } from '@nestjs/core';
import { TemplateCalculationModule } from './template-calculation.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const port = process.env.PORT ? +process.env.PORT_BALANCE_SERVICE : 3001;
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    TemplateCalculationModule,
    {
      transport: Transport.TCP,
      options: {
        port,
      },
    },
  );
  console.log(`Starting port ${port}`)
  await app.listen();
}
bootstrap();
