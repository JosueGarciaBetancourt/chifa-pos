export function up(db) {
	db.prepare(`
		CREATE TABLE IF NOT EXISTS productos (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			nombre TEXT NOT NULL,
			descripcion TEXT,
			precio REAL NOT NULL,
			categoria TEXT NOT NULL
		)
	`).run();
}
