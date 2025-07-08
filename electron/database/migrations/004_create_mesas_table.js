export function up(db) {
	console.log('[MIGRACIÓN] creando tabla mesas...');
	db.prepare(`
	  CREATE TABLE IF NOT EXISTS mesas (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		numero TEXT NOT NULL,
		capacidad INTEGER,
		estado TEXT NOT NULL
	  );
	`).run();
  }
  