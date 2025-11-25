import { Injectable } from '@nestjs/common';
import { join } from 'path';


@Injectable()
export class UplaodService {

   getImageUrl(filename: string) {
    // Build a public-accessible URL
    return `/uploads/${filename}`;
  }

}
