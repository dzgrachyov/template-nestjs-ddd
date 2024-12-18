import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaRepository, UserRepository } from '@library/template-domain';
import { HttpAuthModule } from '@library/http-auth';
import { TemplateCommonModule } from '@library/template-common';

@Module({
  imports: [
    HttpAuthModule,
    TemplateCommonModule,
  ],
  providers: [
    UserService,
    PrismaRepository,
    UserRepository
  ],
  controllers: [UserController]
})
export class UserModule { }
