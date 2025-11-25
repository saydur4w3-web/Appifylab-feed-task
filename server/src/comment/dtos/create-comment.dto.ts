import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { MinimumOneFieldRequred } from 'src/common/validators/minimum-one-field';

export class CreateCommentDto {

  @IsNotEmpty()
  @IsUUID()
  post_id!: string
  
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  content?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  image_url?: string;

  @IsOptional()
  @IsUUID()
  parent_id?: string | null

  @MinimumOneFieldRequred(['content', 'image_url'], {
    message: 'At least one of content or image_url must be provided',
  })
  _atLeastOneField?: never;

}
