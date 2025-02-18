import { Controller, Get } from '@nestjs/common';
import { TemplateApiService } from './template-api.service';
import { ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('default')
export class TemplateApiController {
  constructor(private readonly templateApiService: TemplateApiService) {}

  @Get()
  getHello(): string {
    return this.templateApiService.getHello();
  }
}
