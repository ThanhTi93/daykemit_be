import { IsOptional, IsString, IsArray, ArrayUnique, ArrayNotEmpty, IsInt } from "class-validator";

export class CourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categoryIds?: number[]; // gửi id các category có sẵn
}
