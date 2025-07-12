export function up(db) {
    console.log('[MIGRACION] creando tabla jornadas_laborales...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS jornadas_laborales (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
          sede_id INTEGER NOT NULL REFERENCES sede_local(id) ON DELETE CASCADE,
          fecha_inicio DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
          fecha_fin DATETIME,
          estado TEXT NOT NULL CHECK(estado IN ('iniciada', 'finalizada'))
        );
      `).run();
  }
  