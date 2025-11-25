import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { randomUUID } from 'crypto';
import { extname } from 'path';

export const localMulterConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = './uploads';

      if (!existsSync(uploadPath)) {
        mkdirSync(uploadPath, { recursive: true });
      }

      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const fileExt = extname(file.originalname); // .png, .jpg, etc
      const fileName = `${randomUUID()}${fileExt}`;

      cb(null, fileName);
    },
  }),

  fileFilter: (req: any, file: any, cb: any) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'), false);
    }
    cb(null, true);
  },
};
