import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import fileRoutes from './routes/fileRoutes';
import { loadDb } from './db';
import { Request, Response } from 'express';

// Khởi tạo express app
const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// Log middleware để debug request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

// Đảm bảo thư mục data và uploads tồn tại
const dataDir = path.join(__dirname, '../data');
const uploadsDir = path.join(__dirname, '../uploads');
const viewsDir = path.join(__dirname, './views');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Copy file HTML từ views vào public để phục vụ
const htmlSource = path.join(viewsDir, 'index.html');
const htmlDest = path.join(__dirname, '../public/index.html');

if (fs.existsSync(htmlSource)) {
  fs.copyFileSync(htmlSource, htmlDest);
  console.log(`Copied HTML template from ${htmlSource} to ${htmlDest}`);
}

// Đường dẫn API
app.use('/api/files', fileRoutes);

// Serve trang HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route để truy cập file trực tiếp bằng tên
app.get('/file/:filename', (async (req: Request, res: Response) => {
  try {
    const filename = req.params.filename;
    const db = await loadDb();
    
    // Tìm file trong database bằng tên file
    const file = db.data.files.find(f => 
      f.originalName.toLowerCase() === filename.toLowerCase() ||
      f.filename.toLowerCase() === filename.toLowerCase()
    );
    
    if (!file) {
      return res.status(404).send('File not found');
    }
    
    // Kiểm tra file có tồn tại trên disk không
    if (!fs.existsSync(file.path)) {
      return res.status(404).send('File not found on disk');
    }
    
    // Trả về file
    return res.sendFile(path.resolve(file.path));
  } catch (error) {
    console.error('Error accessing file directly:', error);
    return res.status(500).send('Server error');
  }
}) as any);

// Khởi động server
const startServer = async () => {
  try {
    // Khởi tạo database
    await loadDb();
    
    app.listen(PORT, () => {
      console.log(`Server đang chạy tại http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Lỗi khi khởi động server:', error);
    process.exit(1);
  }
};

startServer();

