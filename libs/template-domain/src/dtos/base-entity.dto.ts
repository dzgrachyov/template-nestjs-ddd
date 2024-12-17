import { IsDate, IsNumber } from "class-validator";

export enum BaseEntityDtoGroup {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  RETRIEVE = 'retrieve'
}

export class BaseEntityDto {
  @IsNumber({}, {
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  id: number;

  @IsDate({
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  created_at: Date;

  @IsDate({
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  updated_at: Date;
}