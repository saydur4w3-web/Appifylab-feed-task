import { IsNotEmpty, IsString, MaxLength } from "class-validator";


export class RefreshTokenDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  refreshToken!: string;

}
