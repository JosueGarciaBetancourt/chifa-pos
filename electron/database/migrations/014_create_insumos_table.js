export function up(db) {
	console.log('[MIGRACION] creando tabla insumos...');
	db.prepare(`
		CREATE TABLE IF NOT EXISTS insumos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  nombre TEXT UNIQUE NOT NULL,
		  tipo_id INTEGER NOT NULL REFERENCES tipos_insumos(id) ON DELETE CASCADE ,
		  unidad_medida TEXT NOT NULL CHECK(unidad_medida IN ('kg', 'g', 'l', 'ml', 'unidad')),
		  stock_minimo REAL NOT NULL DEFAULT 0,
		  activo BOOLEAN NOT NULL DEFAULT 1
		);
	  `).run();
}
  