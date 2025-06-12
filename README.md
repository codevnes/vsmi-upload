# VSMI Upload Server

Ứng dụng server upload file sử dụng Express.js với TypeScript, lưu trữ dữ liệu bằng JSON database.

## Tính năng

- Upload file đơn/nhiều
- Lưu trữ thông tin file trong JSON database
- Hiển thị danh sách file đã upload
- Tải xuống file
- Xóa file

## Cài đặt

### Yêu cầu

- Node.js (v14 trở lên)
- pnpm (hoặc npm/yarn)

### Các bước cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd vsmi-upload
```

2. Cài đặt các dependencies:

```bash
pnpm install
```

3. Build project:

```bash
pnpm build
```

4. Khởi động server:

```bash
pnpm start
```

Hoặc khởi động development server với hot reload:

```bash
pnpm dev
```

Server sẽ chạy tại địa chỉ http://localhost:3000

## Cấu trúc dự án

```
vsmi-upload/
├── src/
│   ├── controllers/    # Xử lý logic
│   ├── db/             # Xử lý database
│   ├── middleware/     # Middleware
│   ├── routes/         # Định nghĩa routes
│   ├── types/          # Type definitions
│   ├── views/          # HTML templates
│   └── index.ts        # Entry point
├── data/               # JSON database storage
├── uploads/            # Upload files storage
├── public/             # Static files
├── dist/               # Compiled JavaScript
└── tsconfig.json       # TypeScript config
```

## API Endpoints

- `POST /api/files/upload` - Upload file
- `GET /api/files` - Lấy danh sách các file
- `GET /api/files/:id` - Lấy thông tin một file
- `GET /api/files/:id/download` - Tải xuống file
- `DELETE /api/files/:id` - Xóa file

## Giao diện người dùng

Truy cập http://localhost:3000 để xem giao diện người dùng, nơi bạn có thể:

- Upload file
- Xem danh sách file
- Tải xuống file
- Xóa file 