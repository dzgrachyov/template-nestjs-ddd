import { Module } from '@nestjs/common';
import { TemplateCalculationController } from './template-calculation.controller';
import { TemplateCalculationService } from './template-calculation.service';

@Module({
  imports: [],
  controllers: [TemplateCalculationController],
  providers: [TemplateCalculationService],
})
export class TemplateCalculationModule {}
