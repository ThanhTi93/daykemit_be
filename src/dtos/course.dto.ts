import { IsOptional, IsString } from "class-validator";

export class CourseDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  categoryIds?: string;

   @IsOptional()
   oldImages?: string | string[];
  
}
