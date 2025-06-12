import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { loadDb } from '../db';
import { FileData } from '../types';

// Upload file
export const uploadFile = async (req: Request, res: Response) => {
  try {
    console.log('Upload request received');
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);
    
    if (!req.file) {
      console.log('No file in request');
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const db = await loadDb();
    
    // Tạo thông tin file
    const fileData: FileData = {
      id: uuidv4(),
      originalName: req.file.originalname,
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size,
      mimetype: req.file.mimetype,
      uploadDate: new Date().toISOString()
    };

    console.log('File data:', fileData);

    // Thêm thông tin file vào database
    db.data.files.push(fileData);
    await db.write();
    console.log('File saved to database');

    return res.status(201).json({
      message: 'File uploaded successfully',
      file: fileData
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return res.status(500).json({ message: 'Server error during file upload' });
  }
};

// Lấy danh sách tất cả các file
export const getAllFiles = async (req: Request, res: Response) => {
  try {
    const db = await loadDb();
    console.log('Getting all files:', db.data.files.length);
    return res.json({ files: db.data.files });
  } catch (error) {
    console.error('Error getting files:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Lấy thông tin một file theo ID
export const getFileById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await loadDb();
    
    const file = db.data.files.find(file => file.id === id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    return res.json({ file });
  } catch (error) {
    console.error('Error getting file:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Download file
export const downloadFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await loadDb();
    
    const file = db.data.files.find(file => file.id === id);
    
    if (!file) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    // Kiểm tra file có tồn tại trên disk không
    if (!fs.existsSync(file.path)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }
    
    // Trả về file để tải xuống
    return res.download(file.path, file.originalName);
  } catch (error) {
    console.error('Error downloading file:', error);
    return res.status(500).json({ message: 'Server error during file download' });
  }
};

// Xóa file
export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = await loadDb();
    
    const fileIndex = db.data.files.findIndex(file => file.id === id);
    
    if (fileIndex === -1) {
      return res.status(404).json({ message: 'File not found' });
    }
    
    const file = db.data.files[fileIndex];
    
    // Xóa file trên disk nếu tồn tại
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
    
    // Xóa thông tin file khỏi database
    db.data.files.splice(fileIndex, 1);
    await db.write();
    
    return res.json({ message: 'File deleted successfully' });
  } catch (error) {
    console.error('Error deleting file:', error);
    return res.status(500).json({ message: 'Server error during file deletion' });
  }
}; 