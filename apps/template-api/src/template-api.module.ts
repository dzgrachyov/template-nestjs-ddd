import { Module } from '@nestjs/common';
import { TemplateApiController } from './template-api.controller';
import { TemplateApiService } from './template-api.service';

@Module({
  imports: [],
  controllers: [TemplateApiController],
  providers: [TemplateApiService],
})
export class TemplateApiModule {}
