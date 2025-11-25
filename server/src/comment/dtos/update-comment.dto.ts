import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';
import { MinimumOneFieldRequred } from 'src/common/validators/minimum-one-field';

export class UpdateCommentDto {

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  image_url?: string;


  @MinimumOneFieldRequred(['content', 'image_url'], {
    message: 'At least one of content or image_url must be provided',
  })
  _atLeastOneField?: never;
}
