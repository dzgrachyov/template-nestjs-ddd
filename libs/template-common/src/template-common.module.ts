import { Module } from '@nestjs/common';
import { TemplateCommonService } from './template-common.service';
import { ErrorInterceptor } from './error.interceptor';

@Module({
  providers: [
    TemplateCommonService,
    ErrorInterceptor
  ],
  exports: [
    TemplateCommonService,
    ErrorInterceptor
  ],
})
export class TemplateCommonModule { }
