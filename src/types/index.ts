export interface FileData {
  id: string;
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimetype: string;
  uploadDate: string;
}

export interface Database {
  files: FileData[];
} 