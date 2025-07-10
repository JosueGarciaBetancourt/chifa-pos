export function up(db) {
  console.log('[MIGRACION] creando tabla recetas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS recetas (
      producto_id INTEGER NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
      insumo_id INTEGER NOT NULL REFERENCES insumos(id),
      cantidad REAL NOT NULL,
      PRIMARY KEY (producto_id, insumo_id)
    );
  `).run();
}
