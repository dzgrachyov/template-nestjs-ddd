import { Module } from '@nestjs/common';
import { TemplateApiController } from './template-api.controller';
import { TemplateApiService } from './template-api.service';
import { IdentityModule } from './identity/identity.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [IdentityModule, UserModule],
  controllers: [TemplateApiController],
  providers: [TemplateApiService],
})
export class TemplateApiModule {}
