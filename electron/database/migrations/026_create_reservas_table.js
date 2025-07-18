export function up(db) {
    console.log('[MIGRACION] creando tabla reservas...');
    db.prepare(`
        CREATE TABLE IF NOT EXISTS reservas (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          cliente_id INTEGER NOT NULL REFERENCES clientes(id),
          mesa_id INTEGER NOT NULL REFERENCES mesas(id),
          usuario_id INTEGER NOT NULL REFERENCES usuarios(id),
          fecha DATE NOT NULL,
          hora TIME NOT NULL,
          numero_personas INTEGER NOT NULL,
          fecha_vencimiento DATE NOT NULL,
          hora_vencimiento TIME NOT NULL,
          estado TEXT NOT NULL CHECK(estado IN ('pendiente', 'confirmada', 'cancelada', 'cumplida')),
          observaciones TEXT,
          created_at DATETIME NOT NULL
        );
      `).run();
  }
  