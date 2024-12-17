import { Module } from '@nestjs/common';
import { TemplateDomainService } from './template-domain.service';

@Module({
  providers: [TemplateDomainService],
  exports: [TemplateDomainService],
})
export class TemplateDomainModule {}
