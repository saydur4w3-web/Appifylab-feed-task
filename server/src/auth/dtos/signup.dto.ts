import { IsEmail, IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from 'class-validator';

export class SignUpDto {
  // @IsString()
  // @IsNotEmpty()
  // @MinLength(3)
  // @MaxLength(50)
  // username: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  first_name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  last_name!: string;

  @IsString()
  @MinLength(2)
  @MaxLength(128)
  password!: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  profile_img?: string;
}
