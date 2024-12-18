import { Module } from '@nestjs/common';
import { TemplateApiController } from './template-api.controller';
import { TemplateApiService } from './template-api.service';
import { IdentityModule } from './identity/identity.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import http_api_config from 'config/http-api.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [http_api_config],
      envFilePath: './apps/template-api/.env',
    }),
    IdentityModule,
    UserModule,
  ],
  controllers: [TemplateApiController],
  providers: [TemplateApiService],
})
export class TemplateApiModule { }
