import { Router } from 'express';
import { uploadFile, getAllFiles, getFileById, downloadFile, deleteFile } from '../controllers/fileController';
import upload from '../middleware/upload';

const router = Router();

// Các routes cho file API
router.post('/upload', upload.single('file'), uploadFile as any);
router.get('/', getAllFiles as any);
router.get('/:id', getFileById as any);
router.get('/:id/download', downloadFile as any);
router.delete('/:id', deleteFile as any);

export default router; 