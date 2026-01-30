import { IsString, Length } from "class-validator";

export class CategoryDto {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(10, 100)
  description?: string;
}


