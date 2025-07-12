export function up(db) {
  console.log('[MIGRACION] creando tabla recetas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS recetas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
      insumo_id INTEGER NOT NULL REFERENCES insumos(id) ON DELETE CASCADE,
      cantidad REAL NOT NULL,

      UNIQUE (producto_id, insumo_id)
    );
  `).run();
}
