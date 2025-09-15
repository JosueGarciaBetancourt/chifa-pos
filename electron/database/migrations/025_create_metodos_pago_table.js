export function up(db) {
    console.log('[MIGRACION] creando tabla metodos_pago...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS metodos_pago (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE NOT NULL
        );
      `).run();
  }
  