import { UserRepository } from '@library/template-domain';
import { UserEntityDto } from '@library/template-domain/dtos/user-entity.dto';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) { }

  async validateNewUser(form: UserEntityDto) {
    const dto = UserEntityDto.from(form);
    const errors = await UserEntityDto.validate(dto);
    return errors;
  }

  async createNewUser(dto: UserEntityDto): Promise<User> {
    const entity = await this.userRepo.createUser({
      email: dto.email,
      password: dto.password,
      name: dto.name,
    });
    return entity;
  }
}
