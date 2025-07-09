export function up(db) {
	console.log('[MIGRACIÓN] creando tabla productos...');
	db.prepare(`
		CREATE TABLE IF NOT EXISTS productos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  codigo TEXT UNIQUE NOT NULL,
		  nombre TEXT NOT NULL,
		  descripcion TEXT,
		  precio REAL NOT NULL,
		  categoria TEXT NOT NULL CHECK(categoria IN ('comida', 'bebida', 'extras')),
		  tiempo_preparacion INTEGER NOT NULL,
		  activo BOOLEAN NOT NULL DEFAULT 1
		);
	  `).run();
  }
  