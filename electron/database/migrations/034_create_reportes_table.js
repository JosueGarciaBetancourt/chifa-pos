export function up(db) {
  console.log('[MIGRACION] creando tabla reportes...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS reportes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      tipo_id INTEGER NOT NULL REFERENCES tipos_reportes(id) ON DELETE CASCADE,
      usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
      sede_id INTEGER NOT NULL REFERENCES sede_local(id) ON DELETE CASCADE,
      titulo TEXT NOT NULL,
      descripcion TEXT,
      parametros_json TEXT,
      ruta_archivo TEXT,
      formato_archivo TEXT CHECK(formato_archivo IN ('pdf', 'xlsx', 'csv', 'json')),
      generado_en DATETIME NOT NULL
    );
  `).run();
}
