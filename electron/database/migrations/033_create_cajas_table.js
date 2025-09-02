export function up(db) {
  console.log('[MIGRACION] creando tabla cajas...');
  db.prepare(`
      CREATE TABLE IF NOT EXISTS cajas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        descripcion TEXT,
        sede_id INTEGER NOT NULL REFERENCES sede_local(id),
        activo BOOLEAN NOT NULL DEFAULT 1
      );
    `).run();
}
  