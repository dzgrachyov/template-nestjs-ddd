import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaRepository, UserRepository } from '@library/template-domain';

@Module({
  providers: [UserService, PrismaRepository, UserRepository],
  controllers: [UserController]
})
export class UserModule { }
