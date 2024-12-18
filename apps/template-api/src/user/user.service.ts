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

  async createNewUser(dto: UserEntityDto): Promise<User> {
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

  async updateUser(user: Pick<User, 'id'>, dto: UserEntityDto): Promise<User> {
    const existed_email = await this.userRepo.userByEmail({ email: dto.email, });
    if (existed_email) {
      throw new HttpException(
        'User with email exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const existed_id = await this.userRepo.user({ id: user.id, });
    if (!existed_id) {
      throw new HttpException(
        'User doe not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      const entity = await this.userRepo.updateUser(existed_id, {
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
        'Unable to update user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteUser(user: Pick<User, 'id'>): Promise<User> {
    const existed = await this.userRepo.user({ id: user.id, });
    if (!existed) {
      throw new HttpException(
        'User doe not exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.userRepo.deleteUser(existed);
  }
}
