export function up(db) {
  console.log('[MIGRACION] Creando tabla roles...');
  
  db.prepare(`
    CREATE TABLE IF NOT EXISTS roles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL 
    );
  `).run();
}

