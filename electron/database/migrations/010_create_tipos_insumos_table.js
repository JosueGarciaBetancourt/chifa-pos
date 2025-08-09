export function up(db) {
	console.log('[MIGRACION] creando tabla tipos_insumos...');
	db.prepare(`
		CREATE TABLE IF NOT EXISTS tipos_insumos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  nombre TEXT UNIQUE NOT NULL,
		  descripcion TEXT,
		  activo BOOLEAN NOT NULL DEFAULT 1
		);
	  `).run();
}
  