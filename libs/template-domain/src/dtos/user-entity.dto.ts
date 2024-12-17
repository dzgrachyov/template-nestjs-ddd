import { User } from "@prisma/client";
import { BaseEntityDto, BaseEntityDtoGroup } from "./base-entity.dto";
import { IsEmail, IsString, IsStrongPassword, validate } from "class-validator";

export class UserEntityDto extends BaseEntityDto {
  @IsEmail({}, {
    groups: [BaseEntityDtoGroup.CREATE]
  })
  email: string;

  @IsStrongPassword({}, {
    groups: [BaseEntityDtoGroup.CREATE]
  })
  password: string;

  @IsString({
    groups: [BaseEntityDtoGroup.UPDATE],
  })
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

  static async validate(dto: UserEntityDto, group: BaseEntityDtoGroup) {
    const errors = await validate(dto, {
      whitelist: true,
      groups: [group],
    });
    return errors.length ? errors : null;
  }
}