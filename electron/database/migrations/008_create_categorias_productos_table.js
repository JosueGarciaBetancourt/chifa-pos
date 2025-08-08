export function up(db) {
	console.log('[MIGRACION] Creando tabla categorias_productos...');
	
	db.prepare(`
	  CREATE TABLE IF NOT EXISTS categorias_productos (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		nombre TEXT NOT NULL,
		descripcion TEXT,
		activo BOOLEAN NOT NULL DEFAULT 1
	  );
	`).run();
  }
  
  