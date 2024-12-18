import { Controller, Get } from '@nestjs/common';
import { TemplateCalculationService } from './template-calculation.service';

@Controller()
export class TemplateCalculationController {
  constructor(private readonly templateCalculationService: TemplateCalculationService) {}

  @Get()
  getHello(): string {
    return this.templateCalculationService.getHello();
  }
}
