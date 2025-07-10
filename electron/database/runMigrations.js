// electron/database/runMigrations.js
import { up as upRoles } from './migrations/001_create_roles_table.js';
import { up as upUsuarios } from './migrations/002_create_usuarios_table.js';
import { up as upClientes } from './migrations/003_create_clientes_table.js';
import { up as upCategorias } from './migrations/004_create_categorias_table.js';
import { up as upProductos } from './migrations/005_create_productos_table.js';
import { up as upInsumos } from './migrations/006_create_insumos_table.js';
import { up as upMesas } from './migrations/007_create_mesas_table.js';
import { up as upPedidos } from './migrations/008_create_pedidos_table.js';
import { up as upDetallesPedido } from './migrations/009_create_detalles_pedido_table.js';
import { up as upRecetas } from './migrations/010_create_recetas_table.js';
import { up as upReservas } from './migrations/011_create_reservas_table.js';
import { up as upComprobantes } from './migrations/012_create_comprobantes_table.js';
import { up as upMovimientosCaja } from './migrations/013_create_movimientos_caja_table.js';
import { up as upInventarioMovimientos } from './migrations/014_create_inventario_movimientos_table.js';
import { up as upCotizaciones } from './migrations/015_create_cotizaciones_table.js';
import { up as upDispositivos } from './migrations/016_create_dispositivos_table.js';

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

  // Lista de migraciones en orden con sus dependencias
  const migrations = [
    { name: '001_create_roles_table', fn: upRoles },
    { name: '002_create_usuarios_table', fn: upUsuarios },
    { name: '003_create_clientes_table', fn: upClientes },
    { name: '004_create_categorias_table', fn: upCategorias },
    { name: '005_create_productos_table', fn: upProductos },
    { name: '006_create_insumos_table', fn: upInsumos },
    { name: '007_create_mesas_table', fn: upMesas },
    { name: '008_create_reservas_table', fn: upReservas },
    { name: '009_create_pedidos_table', fn: upPedidos },
    { name: '010_create_detalles_pedido_table', fn: upDetallesPedido },
    { name: '011_create_comprobantes_table', fn: upComprobantes },
    { name: '012_create_movimientos_caja_table', fn: upMovimientosCaja },
    { name: '013_create_recetas_table', fn: upRecetas },
    { name: '014_create_inventario_movimientos_table', fn: upInventarioMovimientos },
    { name: '015_create_cotizaciones_table', fn: upCotizaciones },
    { name: '016_create_dispositivos_table', fn: upDispositivos },
  ];

  for (const migration of migrations) {
    if (!applied.has(migration.name)) {
      try {
        console.log(`Ejecutando ${migration.name}...`);
        migration.fn(db);
        db.prepare('INSERT INTO migrations (name) VALUES (?)').run(migration.name);
        console.log(`- Migracion ${migration.name} aplicada.\n`);
      } catch (err) {
        console.error(`X Error ejecutando ${migration.name}:`, err);
        throw err;
      }
    } else {
      console.log(`→ Migracion ${migration.name} ya aplicada. Se omite.\n`);
    }
  }

  console.log('Todas las migraciones completadas.');
}