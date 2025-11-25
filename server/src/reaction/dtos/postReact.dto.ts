import { IsUUID, IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class PostReactDto {

  @IsNotEmpty()
  @IsUUID()
  postId!: string;

  // null = remove reaction
  @IsOptional()
  @IsInt()
  @Min(1)
  reactionId!: number | null;

}
