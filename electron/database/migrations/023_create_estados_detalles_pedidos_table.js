export function up(db) {
  console.log('[MIGRACION] creando tabla estados_detalles_pedidos...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS estados_detalles_pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL,
      descripcion TEXT
    );
  `).run();
}
