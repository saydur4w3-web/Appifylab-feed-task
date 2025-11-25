import { IsNotEmpty, IsUUID } from 'class-validator';
import { Transform } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class UuidParamDTO {
  @IsNotEmpty({ message: 'ID is required' })
  @IsUUID('4', { message: 'ID must be a valid UUID v4' })
  @Transform(({ value, key }) => {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException(`${key} must be a valid UUID`);
    }
    return value.trim().toLowerCase();
  })
  id!: string;
}

export const PARAM_ID = ':id';