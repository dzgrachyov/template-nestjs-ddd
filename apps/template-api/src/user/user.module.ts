import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaRepository, UserRepository, HttpAuthModule, InterceptorsModule } from '@library/template-domain';

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
