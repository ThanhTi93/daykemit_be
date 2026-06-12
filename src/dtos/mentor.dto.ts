import {
  IsInt,
  IsOptional,
  IsString,
} from "class-validator";
import { Transform } from "class-transformer";

export class MentorDto {
  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsInt()
  experienceYears?: number;

  @IsOptional()
  @IsString()
  socialLinks?: string;

  @IsOptional()
  categoryIds?: string | number[];

    // ✅ ADD THIS
  @Transform(({ value }) => Number(value))
  @IsInt()
  accountId: number;
}