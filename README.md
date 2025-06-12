# VSMI File Upload

A simple file upload server with Express.js, TypeScript, and LowDB.

## Features

- Upload files via web interface or API
- List uploaded files
- Download files
- Delete files
- Direct file access via URL
- Copy file URL to clipboard

## Installation

```bash
# Install dependencies
npm install

# Install PM2 globally (if not already installed)
npm install -g pm2
```

## Development

```bash
# Run in development mode
npm run dev
```

## Production Deployment with PM2

The application is configured to run on port 2025 in production mode using PM2.

```bash
# Build the application
./build.sh

# Start with PM2
npm run pm2:start

# Check status
npm run pm2:status

# View logs
npm run pm2:logs

# Restart the application
npm run pm2:restart

# Stop the application
npm run pm2:stop
```

## PM2 Configuration

The PM2 configuration is in `ecosystem.config.js`. You can modify this file to change:

- Application port (default: 2025)
- Number of instances
- Memory limit
- Other PM2 settings

## API Endpoints

- `GET /api/files` - List all files
- `POST /api/files/upload` - Upload a file
- `GET /api/files/:id/download` - Download a file
- `DELETE /api/files/:id` - Delete a file
- `GET /file/:filename` - Direct access to a file by filename

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

## Giao diện người dùng

Truy cập http://localhost:3000 để xem giao diện người dùng, nơi bạn có thể:

- Upload file
- Xem danh sách file
- Tải xuống file
- Xóa file 