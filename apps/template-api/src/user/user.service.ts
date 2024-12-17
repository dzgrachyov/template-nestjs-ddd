import { UserRepository } from '@library/template-domain';
import { UserEntityDto } from '@library/template-domain/dtos/user-entity.dto';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) { }

  async validateNewUser(form: UserEntityDto) {
    const dto = UserEntityDto.from(form);
    const errors = await UserEntityDto.validate(dto);
    if (errors?.length) {
      throw new HttpException(
        'Invalid user data',
        HttpStatus.BAD_REQUEST,
        {
          description: JSON.stringify(errors),
        }
      );
    }
  }

  async createNewUser(dto: UserEntityDto): Promise<User | null> {
    const existed = await this.userRepo.userByEmail({ email: dto.email, });
    if (existed) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const entity = await this.userRepo.createUser({
        email: dto.email,
        password: dto.password,
        name: dto.name,
      });
      if (!entity) {
        throw new HttpException(
          'User not created',
          HttpStatus.BAD_REQUEST,
        );
      }
      return entity;
    }
    catch (error) {
      throw new HttpException(
        'Unable to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
