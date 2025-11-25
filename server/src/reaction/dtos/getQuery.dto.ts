import { IsUUID, IsInt, IsOptional, Min, IsNotEmpty } from 'class-validator';

export class GetQueryDto {

  @IsOptional()
  @IsInt()
  @Min(1)
  reactionId?: number;

}
