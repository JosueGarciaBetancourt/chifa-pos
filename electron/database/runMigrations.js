import { up as upUsuarios } from './migrations/001_create_usuarios_table.js';
import { up as upClientes } from './migrations/002_create_clientes_table.js';
import { up as upProductos } from './migrations/003_create_productos_table.js';
import { up as upMesas } from './migrations/004_create_mesas_table.js';
import { up as upPedidos } from './migrations/005_create_pedidos_table.js';
import { up as upReservas } from './migrations/006_create_reservas_table.js';
import { up as upDetallesPedido } from './migrations/007_create_detalles_pedido_table.js';

/**
 * Orquesta todas las migraciones en orden y registra su aplicación.
 */
export async function runMigrations(db) {
  // Asegúrate de que las claves foráneas estén activadas
  db.pragma('foreign_keys = ON;');

  // Crea tabla de control de migraciones si no existe
  db.prepare(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      run_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `).run();

  // Obtiene migraciones ya aplicadas
  const applied = new Set(
    db.prepare('SELECT name FROM migrations').all().map(r => r.name)
  );

  console.log('🔄 Ejecutando migraciones pendientes...\n');

  // Lista de migraciones en orden
  const migrations = [
    { name: '001_create_usuarios_table', fn: upUsuarios },
    { name: '002_create_clientes_table', fn: upClientes },
    { name: '003_create_productos_table', fn: upProductos },
    { name: '004_create_mesas_table', fn: upMesas },
    { name: '005_create_pedidos_table', fn: upPedidos },
    { name: '006_create_reservas_table', fn: upReservas },
    { name: '007_create_detalles_pedido_table', fn: upDetallesPedido },
  ];

  for (const migration of migrations) {
    if (!applied.has(migration.name)) {
      try {
        console.log(`🚀 Ejecutando ${migration.name}...`);
        migration.fn(db);
        db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name);
        console.log(`✅ Migración ${migration.name} aplicada.\n`);
      } catch (err) {
        console.error(`❌ Error ejecutando ${migration.name}:`, err);
        throw err;
      }
    } else {
      console.log(`⏭️  Migración ${migration.name} ya aplicada. Se omite.\n`);
    }
  }

  console.log('🎉 Todas las migraciones completadas.');
}
