import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

// Đảm bảo thư mục uploads tồn tại
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
console.log('Upload directory:', uploadDir);

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('Multer destination called for file:', file.originalname);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Tạo tên file duy nhất bằng uuid + đuôi file gốc
    const uniqueFileName = `${uuidv4()}${path.extname(file.originalname)}`;
    console.log('Generated filename:', uniqueFileName, 'for original:', file.originalname);
    cb(null, uniqueFileName);
  }
});

// Hàm kiểm tra loại file (tùy chọn)
const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  // Cho phép tất cả các loại file trong ví dụ này
  // Có thể thêm logic kiểm tra loại file ở đây nếu cần
  console.log('File filter checking:', file.originalname, 'mimetype:', file.mimetype);
  cb(null, true);
};

// Cấu hình upload
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // Giới hạn 10MB
});

console.log('Multer middleware configured');

export default upload; 