import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsString,
  IsBoolean,
  IsIn,
  Length,
} from "class-validator";

export class AccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @Length(3, 100)
  username: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  @Length(9, 20)
  phone?: string;

  @IsOptional()
  @IsIn(["admin", "mentor", "student", "user"])
  role?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

}

export class UpdateAccountDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  password?: string;

  @IsOptional()
  @IsString()
  @Length(3, 100)
  username?: string;

  @IsOptional()
  @IsString()
  imgUrl?: string;

  @IsOptional()
  @IsString()
  @Length(9, 20)
  phone?: string;

  @IsOptional()
  @IsIn(["admin", "mentor", "student", "user"])
  role?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;
}
