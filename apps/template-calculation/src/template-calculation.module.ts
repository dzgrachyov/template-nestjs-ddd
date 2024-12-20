import { Module } from '@nestjs/common';
import { TemplateCalculationController } from './template-calculation.controller';
import { TemplateCalculationService } from './template-calculation.service';
import { ConfigModule } from '@nestjs/config';
import balance_service_config from 'config/balance-service.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [balance_service_config],
    }),
  ],
  controllers: [TemplateCalculationController],
  providers: [TemplateCalculationService],
})
export class TemplateCalculationModule { }
