import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber } from "class-validator";

export enum BaseEntityDtoGroup {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  GET = 'get'
}

export class BaseEntityDto {
  @IsNumber({}, {
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  @ApiProperty({ description: 'Entity id', required: false, readOnly: true })
  id: number;

  @IsDate({
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  @ApiProperty({ description: 'Entity creation date', required: false, readOnly: true })
  created_at: Date;

  @IsDate({
    groups: [BaseEntityDtoGroup.UPDATE]
  })
  @ApiProperty({ description: 'Entity updated at', required: false, readOnly: true })
  updated_at: Date;
}