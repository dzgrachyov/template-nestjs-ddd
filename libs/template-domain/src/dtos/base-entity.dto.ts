import { IsDate, IsNumber } from "class-validator";

export class BaseEntityDto {
  @IsNumber()
  id: number;

  @IsDate()
  created_at: Date;

  @IsDate()
  updated_at: Date;
}