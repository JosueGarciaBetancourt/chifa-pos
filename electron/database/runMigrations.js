import { up as upEmpresaLocal } from './migrations/001_create_empresa_local_table.js';
import { up as upSedeLocal } from './migrations/002_create_sede_local_table.js';
import { up as upRoles } from './migrations/003_create_roles_table.js';
import { up as upPermisos } from './migrations/004_create_permisos_table.js';
import { up as upRolesPermisos } from './migrations/005_create_roles_permisos_table.js';
import { up as upUsuarios } from './migrations/006_create_usuarios_table.js';
import { up as upJornadasLaborales } from './migrations/007_create_jornadas_laborales_table.js';
import { up as upCategorias } from './migrations/008_create_categorias_table.js';
import { up as upProductos } from './migrations/009_create_productos_table.js';
import { up as upInsumos} from './migrations/010_create_insumos_table.js';
import { up as upRecetas } from './migrations/011_create_recetas_table.js';
import { up as upClientes } from './migrations/012_create_clientes_table.js';
import { up as upCotizaciones } from './migrations/013_create_cotizaciones_table.js';
import { up as upEstadosMesas } from './migrations/014_create_estados_mesas_table.js';
import { up as upMesas } from './migrations/015_create_mesas_table.js';
import { up as upTiposPedidos } from './migrations/016_create_tipos_pedidos_table.js';
import { up as upEstadosPedidos } from './migrations/017_create_estados_pedidos_table.js';
import { up as upPedidos } from './migrations/018_create_pedidos_table.js';
import { up as upEstadosDetallesPedidos } from './migrations/019_create_estados_detalles_pedidos_table.js';
import { up as upDetallesPedidos } from './migrations/020_create_detalles_pedidos_table.js';
import { up as upMetodosPago } from './migrations/021_create_metodos_pago_table.js';
import { up as upEstadosComprobantes } from './migrations/022_create_estados_comprobantes_table.js';
import { up as upTiposComprobantes } from './migrations/023_create_tipos_comprobantes_table.js';
import { up as upComprobantes } from './migrations/024_create_comprobantes_table.js';
import { up as upReservas } from './migrations/025_create_reservas_table.js';
import { up as upInventarioMovimientos } from './migrations/026_create_inventario_movimientos_table.js';
import { up as upProveedores } from './migrations/027_create_proveedores_table.js';
import { up as upComprasInsumosProveedores } from './migrations/028_create_compras_insumos_proveedores_table.js';
import { up as upMovimientosCaja } from './migrations/029_create_movimientos_caja_table.js';
import { up as upDispositivos } from './migrations/030_create_dispositivos_table.js';
import { up as upTiposNotificaciones } from './migrations/031_create_tipos_notificaciones_table.js';
import { up as upNotificaciones } from './migrations/032_create_notificaciones_table.js';
import { up as upLogsSistema } from './migrations/033_create_logs_sistema_table.js';

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
    { name: '001_create_empresa_local_table', fn: upEmpresaLocal },
    { name: '002_create_sede_local_table', fn: upSedeLocal },
    { name: '003_create_roles_table', fn: upRoles },
    { name: '004_create_permisos_table', fn: upPermisos },
    { name: '005_create_roles_permisos_table', fn: upRolesPermisos },
    { name: '006_create_usuarios_table', fn: upUsuarios },
    { name: '007_create_jornadas_laborales_table', fn: upJornadasLaborales },
    { name: '008_create_categorias_table', fn: upCategorias },
    { name: '009_create_productos_table', fn: upProductos },
    { name: '010_create_insumos_table', fn: upInsumos },
    { name: '011_create_recetas_table', fn: upRecetas },
    { name: '012_create_clientes_table', fn: upClientes },
    { name: '013_create_cotizaciones_table', fn: upCotizaciones },
    { name: '014_create_estados_mesas_table', fn: upEstadosMesas },
    { name: '015_create_mesas_table', fn: upMesas },
    { name: '016_create_tipos_pedidos_table', fn: upTiposPedidos },
    { name: '017_create_estados_pedidos_table', fn: upEstadosPedidos },
    { name: '018_create_pedidos_table', fn: upPedidos },
    { name: '019_create_estados_detalles_pedidos_table', fn: upEstadosDetallesPedidos },
    { name: '020_create_detalles_pedidos_table', fn: upDetallesPedidos },
    { name: '021_create_metodos_pago_table', fn: upMetodosPago },
    { name: '022_create_estados_comprobantes_table', fn: upEstadosComprobantes },
    { name: '023_create_tipos_comprobantes_table', fn: upTiposComprobantes },
    { name: '024_create_comprobantes_table', fn: upComprobantes },
    { name: '025_create_reservas_table', fn: upReservas },
    { name: '026_create_inventario_movimientos_table', fn: upInventarioMovimientos },
    { name: '027_create_proveedores_table', fn: upProveedores },
    { name: '028_create_compras_insumos_proveedores_table', fn: upComprasInsumosProveedores },
    { name: '029_create_movimientos_caja_table', fn: upMovimientosCaja },
    { name: '030_create_dispositivos_table', fn: upDispositivos },
    { name: '031_create_tipos_notificaciones_table', fn: upTiposNotificaciones },
    { name: '032_create_notificaciones_table', fn: upNotificaciones },
    { name: '033_create_logs_sistema_table', fn: upLogsSistema }
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