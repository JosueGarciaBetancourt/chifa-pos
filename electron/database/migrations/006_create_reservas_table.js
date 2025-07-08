export function up(db) {
  console.log('[MIGRACIÓN] creando tabla reservas...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS reservas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente_id INTEGER,
      mesa_id INTEGER,
      usuario_id INTEGER,
      fecha DATE DEFAULT CURRENT_DATE NOT NULL,
      hora TIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
      numero_personas INTEGER NOT NULL,
      estado TEXT NOT NULL,
      observaciones TEXT,
      FOREIGN KEY (cliente_id) REFERENCES clientes(id),
      FOREIGN KEY (mesa_id) REFERENCES mesas(id)
      FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
    );
  `).run();
}
