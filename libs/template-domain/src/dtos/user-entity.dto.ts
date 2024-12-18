import { User } from "@prisma/client";
import { BaseEntityDto, BaseEntityDtoGroup } from "./base-entity.dto";
import { IsEmail, IsString, IsStrongPassword, validate } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class UserEntityDto extends BaseEntityDto {
  @IsEmail({}, {
    groups: [BaseEntityDtoGroup.CREATE]
  })
  @ApiProperty({ description: 'User email' })
  email: string;

  @IsStrongPassword({}, {
    groups: [BaseEntityDtoGroup.CREATE]
  })
  @ApiProperty({ description: 'User password' })
  password: string;

  @IsString({
    groups: [BaseEntityDtoGroup.UPDATE],
  })
  @ApiProperty({ description: 'User name', nullable: true, required: false, })
  name?: string;

  static from(entity: UserEntityDto): UserEntityDto {
    const dto = new UserEntityDto();
    dto.id = entity.id;
    dto.created_at = entity.created_at;
    dto.updated_at = entity.updated_at;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.name = entity.name;
    return dto;
  }

  static fromEntity(entity: User): UserEntityDto {
    const dto = new UserEntityDto();
    dto.id = entity.id;
    dto.created_at = entity.created_at;
    dto.updated_at = entity.updated_at;
    dto.email = entity.email;
    dto.password = entity.password;
    dto.name = entity.name;
    return dto;
  }

  static async validate(dto: UserEntityDto, ...groups: BaseEntityDtoGroup[]) {
    const errors = await validate(dto, {
      groups,
      whitelist: true,
      skipNullProperties: true,
    });
    return errors.length ? errors : null;
  }
}