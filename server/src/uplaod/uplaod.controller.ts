import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { localMulterConfig } from './multer.config';
import { UplaodService } from './uplaod.service';

@Controller('upload')
export class UplaodController {
  constructor(private readonly uploadService: UplaodService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('file', localMulterConfig))
  uploadLocalImage(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const url = this.uploadService.getImageUrl(file.filename);

    return { url };

  }
}
