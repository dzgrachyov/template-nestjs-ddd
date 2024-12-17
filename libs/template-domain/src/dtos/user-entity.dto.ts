import { User } from "@prisma/client";
import { BaseEntityDto } from "./base-entity.dto";
import { IsEmail, IsString, IsStrongPassword, validate } from "class-validator";

export class UserEntityDto extends BaseEntityDto {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsString()
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

  static async validate(dto: UserEntityDto) {
    const errors = await validate(dto, {
      whitelist: true,
    });
    return errors.length ? errors : null;
  }
}