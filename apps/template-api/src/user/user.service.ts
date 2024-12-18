import { UserRepository } from '@library/template-domain';
import { BaseEntityDtoGroup, UserEntityDto } from '@library/template-domain';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) { }

  async validateNewUser(form: UserEntityDto) {
    const dto = UserEntityDto.from(form);
    const errors = await UserEntityDto.validate(dto, BaseEntityDtoGroup.CREATE);
    if (!errors?.length) return;
    throw new HttpException(
      'Invalid user data',
      HttpStatus.BAD_REQUEST,
      {
        cause: errors,
      }
    );

  }

  async validateUpdateUser(form: UserEntityDto) {
    const dto = UserEntityDto.from(form);
    const errors = await UserEntityDto.validate(dto, BaseEntityDtoGroup.UPDATE);
    if (!errors?.length) return;
    throw new HttpException(
      'Invalid user data',
      HttpStatus.BAD_REQUEST,
      {
        cause: errors,
      }
    );
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

  async updateUser(user: Pick<User, 'id'>, dto: UserEntityDto): Promise<User | null> {
    const existed = await this.userRepo.userByEmail({ email: dto.email, });
    if (existed) {
      throw new HttpException(
        'User with email exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      if (!existed) {
        const entity = await this.userRepo.updateUser(existed, {
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
    }
    catch (error) {
      throw new HttpException(
        'Unable to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
