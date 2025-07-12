export function up(db) {
  console.log('[MIGRACION] creando tabla tipos_pedidos...');
  db.prepare(`
    CREATE TABLE IF NOT EXISTS tipos_pedidos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT UNIQUE NOT NULL
    );
  `).run();
}
