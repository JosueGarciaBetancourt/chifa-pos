import path from 'path';
import fs from 'fs';
import Database from 'better-sqlite3';
import { app } from 'electron';

export function initDatabase() {
  const userDataPath = path.join(app.getPath('appData'), 'Electron');
  const dbDir = path.join(userDataPath, 'databases');

  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    console.log('- Carpeta databases creada en:', dbDir);
  }

  const dbPath = path.join(dbDir, 'chifa.db');
  console.log('- Ruta de base de datos:', dbPath);

  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('- Base de datos anterior eliminada.');
  }

  const db = new Database(dbPath);

  db.prepare(`
    CREATE TABLE productos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      precio REAL NOT NULL,
      categoria TEXT NOT NULL
    )
  `).run();

  const insert = db.prepare(`
    INSERT INTO productos (nombre, descripcion, precio, categoria)
    VALUES (?, ?, ?, ?)
  `);

  const productos = [
    ['Arroz Chaufa Especial', 'Arroz frito con pollo, cerdo y langostinos', 22.50, 'platos_principales'],
    ['Taypa', 'Salteado de carnes mixtas con verduras', 26.00, 'platos_principales'],
    // ... agrega más productos si deseas
  ];

  const insertMany = db.transaction((productos) => {
    for (const p of productos) {
      insert.run(p);
    }
  });

  insertMany(productos);
  console.log('- Base de datos inicializada.');

  db.close();
}
