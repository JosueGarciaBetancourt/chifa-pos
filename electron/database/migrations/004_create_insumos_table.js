export function up(db) {
	console.log('[MIGRACIÓN] creando tabla insumos...');
	db.prepare(`
		CREATE TABLE IF NOT EXISTS insumos (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  nombre TEXT UNIQUE NOT NULL,
		  unidad_medida TEXT NOT NULL CHECK(unidad_medida IN ('kg', 'g', 'l', 'ml', 'unidad')),
		  stock_actual REAL NOT NULL DEFAULT 0,
		  stock_minimo REAL NOT NULL DEFAULT 0,
		  costo REAL NOT NULL
		);
	  `).run();
  }
  