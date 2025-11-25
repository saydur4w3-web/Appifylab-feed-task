import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class DeleteCommentDto {

  @IsNotEmpty()
  @IsUUID()
  comment_id!: string

  @IsOptional()
  @IsUUID()
  parent_id?: string | null

}
