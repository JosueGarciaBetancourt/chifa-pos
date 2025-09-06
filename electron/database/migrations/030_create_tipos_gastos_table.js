export function up(db) {
  console.log('[MIGRACION] creando tabla tipos_gastos...');

  db.prepare(`
    CREATE TABLE tipos_gastos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      descripcion TEXT,
      activo BOOLEAN NOT NULL DEFAULT 1
    );
  `).run();
}
