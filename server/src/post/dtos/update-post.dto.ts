import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { MinimumOneFieldRequred } from 'src/common/validators/minimum-one-field';

export class UpdatePostDto {
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  image_url?: string;

  @IsOptional()
  @IsBoolean()
  is_public?: boolean;

  @MinimumOneFieldRequred(['content', 'image_url'], {
    message: 'At least one of content or image_url must be provided',
  })
  _atLeastOneField?: never;
}
