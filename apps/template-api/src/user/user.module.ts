import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaRepository, UserRepository, InterceptorsModule } from '@library/template-domain';
import { HttpAuthModule } from '@library/http-auth';

@Module({
  imports: [
    HttpAuthModule,
    InterceptorsModule,
  ],
  providers: [
    UserService,
    PrismaRepository,
    UserRepository
  ],
  controllers: [UserController]
})
export class UserModule { }
