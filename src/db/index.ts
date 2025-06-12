import { join } from 'path';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { Database } from '../types';

// Tạo đường dẫn đến file database.json
const dbFile = join(__dirname, '../../data/db.json');

// Tạo adapter cho lowdb
const adapter = new JSONFile<Database>(dbFile);
// Tạo instance của database
const db = new Low<Database>(adapter, { files: [] });

// Hàm để load database
export const loadDb = async () => {
  try {
    await db.read();
    // Nếu không có dữ liệu, khởi tạo giá trị mặc định
    db.data = db.data || { files: [] };
    return db;
  } catch (error) {
    console.error('Error loading database:', error);
    // Trả về database với giá trị mặc định
    return db;
  }
};

export default db; 