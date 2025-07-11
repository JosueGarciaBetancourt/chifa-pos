export function up(db) {
	console.log('[MIGRACION] Creando tabla categorias...');
	
	db.prepare(`
	  CREATE TABLE IF NOT EXISTS categorias (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nombre TEXT NOT NULL,
		descripcion TEXT
	  );
	`).run();
  }
  
  