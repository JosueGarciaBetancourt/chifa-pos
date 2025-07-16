export function up(db) {
    console.log('[MIGRACION] creando tabla tipos_comprobantes...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS tipos_comprobantes (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE NOT NULL,
          serie_letras_iniciales TEXT NOT NULL CHECK (length(serie_letras_iniciales) <= 3)
        );
      `).run();
  }
  