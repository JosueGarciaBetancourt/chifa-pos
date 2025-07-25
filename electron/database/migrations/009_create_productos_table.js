export function up(db) {
	console.log('[MIGRACION] creando tabla productos...');
	db.prepare(`
		CREATE TABLE IF NOT EXISTS productos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  codigo TEXT UNIQUE NOT NULL,
		  nombre TEXT NOT NULL,
		  descripcion TEXT,
		  precio REAL NOT NULL,
		  categoria_id INTEGER NOT NULL REFERENCES categorias_productos(id) ON DELETE CASCADE,
		  tiempo_preparacion_min INTEGER NOT NULL,
		  activo BOOLEAN NOT NULL DEFAULT 1
		);
	  `).run();
}
  