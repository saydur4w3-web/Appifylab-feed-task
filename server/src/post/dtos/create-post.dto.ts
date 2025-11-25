import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { MinimumOneFieldRequred } from 'src/common/validators/minimum-one-field';

export class CreatePostDto {
  
  @IsOptional()
  @IsString()
  @MaxLength(10000)
  content?: string;

  // @IsOptional()
  // @IsString({ each: true })
  // images?: string[]; // URLs of images

  @IsOptional()
  @IsString()
  @MaxLength(100)
  image_url?: string;


  @IsNotEmpty()
  @IsBoolean()
  is_public!: boolean;

  @MinimumOneFieldRequred(['content', 'image_url'], {
    message: 'At least one of content or image_url must be provided',
  })
  _atLeastOneField?: never;

}
