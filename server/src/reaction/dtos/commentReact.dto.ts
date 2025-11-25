import { IsUUID, IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class CommentReactDto {

  @IsNotEmpty()
  @IsUUID()
  commentId!: string;

  // null = remove reaction
  @IsOptional()
  @IsInt()
  @Min(1)
  reactionId!: number | null;

}
