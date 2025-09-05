import { up as upEmpresaLocal } from './migrations/001_create_empresa_local_table.js';
import { up as upSedeLocal } from './migrations/002_create_sede_local_table.js';
import { up as upRoles } from './migrations/003_create_roles_table.js';
import { up as upPermisos } from './migrations/004_create_permisos_table.js';
import { up as upRolesPermisos } from './migrations/005_create_roles_permisos_table.js';
import { up as upUsuarios } from './migrations/006_create_usuarios_table.js';
import { up as upJornadasLaborales } from './migrations/007_create_jornadas_laborales_table.js';
import { up as upCategoriasProductos } from './migrations/008_create_categorias_productos_table.js';
import { up as upProductos } from './migrations/009_create_productos_table.js';
import { up as upTiposInsumos } from './migrations/010_create_tipos_insumos_table.js';
import { up as upInsumos } from './migrations/011_create_insumos_table.js';
import { up as upRecetas } from './migrations/012_create_recetas_table.js';
import { up as upClientes } from './migrations/013_create_clientes_table.js';
import { up as upCotizaciones } from './migrations/014_create_cotizaciones_table.js';
import { up as upEstadosMesas } from './migrations/015_create_estados_mesas_table.js';
import { up as upMesas } from './migrations/016_create_mesas_table.js';
import { up as upTiposPedidos } from './migrations/017_create_tipos_pedidos_table.js';
import { up as upEstadosPedidos } from './migrations/018_create_estados_pedidos_table.js';
import { up as upPedidos } from './migrations/019_create_pedidos_table.js';
import { up as upEstadosDetallesPedidos } from './migrations/020_create_estados_detalles_pedidos_table.js';
import { up as upDetallesPedidos } from './migrations/021_create_detalles_pedidos_table.js';
import { up as upMetodosPago } from './migrations/022_create_metodos_pago_table.js';
import { up as upEstadosComprobantes } from './migrations/023_create_estados_comprobantes_table.js';
import { up as upTiposComprobantes } from './migrations/024_create_tipos_comprobantes_table.js';
import { up as upComprobantes } from './migrations/025_create_comprobantes_venta_table.js';
import { up as upReservas } from './migrations/026_create_reservas_table.js';
import { up as upInventarioMovimientos } from './migrations/027_create_inventario_movimientos_table.js';
import { up as upProveedores } from './migrations/028_create_proveedores_table.js';
import { up as upInsumosProveedores } from './migrations/029_create_insumos_proveedores_table.js';
import { up as upTiposGastos } from './migrations/030_create_tipos_gastos_table.js';
import { up as upComprasInsumosProveedores } from './migrations/031_create_compras_insumos_proveedores_table.js';
import { up as upGastos } from './migrations/032_create_gastos_table.js';
import { up as upCajas } from './migrations/033_create_cajas_table.js';
import { up as upMovimientosCaja } from './migrations/034_create_movimientos_caja_table.js';
import { up as upAperturasCaja } from './migrations/035_create_aperturas_caja_table.js';
import { up as upIngresosEgresosCaja } from './migrations/036_create_ingresos_egresos_caja_table.js';
import { up as upCierresCaja } from './migrations/037_create_cierres_caja_table.js';
import { up as upDispositivos } from './migrations/038_create_dispositivos_table.js';
import { up as upTiposReportes } from './migrations/039_create_tipos_reportes_table.js';
import { up as upReportes } from './migrations/040_create_reportes_table.js';
import { up as upTiposNotificaciones } from './migrations/041_create_tipos_notificaciones_table.js';
import { up as upNotificaciones } from './migrations/042_create_notificaciones_table.js';
import { up as upLogsSistema } from './migrations/043_create_logs_sistema_table.js';

import { DateFormatter } from './utils/dateFormatter.js';

export async function runMigrations(db) {
  db.pragma('foreign_keys = ON;');

  db.prepare(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      run_at DATETIME NOT NULL
    );
  `).run();

  const applied = new Set(
    db.prepare('SELECT name FROM migrations').all().map(r => r.name)
  );

  console.log('\nEjecutando migraciones pendientes...\n');

  const migrations = [
    { name: '001_create_empresa_local_table', fn: upEmpresaLocal },
    { name: '002_create_sede_local_table', fn: upSedeLocal },
    { name: '003_create_roles_table', fn: upRoles },
    { name: '004_create_permisos_table', fn: upPermisos },
    { name: '005_create_roles_permisos_table', fn: upRolesPermisos },
    { name: '006_create_usuarios_table', fn: upUsuarios },
    { name: '007_create_jornadas_laborales_table', fn: upJornadasLaborales },
    { name: '008_create_categorias_productos_table', fn: upCategoriasProductos },
    { name: '009_create_productos_table', fn: upProductos },
    { name: '010_create_tipos_insumos_table', fn: upTiposInsumos },
    { name: '011_create_insumos_table', fn: upInsumos },
    { name: '012_create_recetas_table', fn: upRecetas },
    { name: '013_create_clientes_table', fn: upClientes },
    { name: '014_create_cotizaciones_table', fn: upCotizaciones },
    { name: '015_create_estados_mesas_table', fn: upEstadosMesas },
    { name: '016_create_mesas_table', fn: upMesas },
    { name: '017_create_tipos_pedidos_table', fn: upTiposPedidos },
    { name: '018_create_estados_pedidos_table', fn: upEstadosPedidos },
    { name: '019_create_pedidos_table', fn: upPedidos },
    { name: '020_create_estados_detalles_pedidos_table', fn: upEstadosDetallesPedidos },
    { name: '021_create_detalles_pedidos_table', fn: upDetallesPedidos },
    { name: '022_create_metodos_pago_table', fn: upMetodosPago },
    { name: '023_create_estados_comprobantes_table', fn: upEstadosComprobantes },
    { name: '024_create_tipos_comprobantes_table', fn: upTiposComprobantes },
    { name: '025_create_comprobantes_table', fn: upComprobantes },
    { name: '026_create_reservas_table', fn: upReservas },
    { name: '027_create_inventario_movimientos_table', fn: upInventarioMovimientos },
    { name: '028_create_proveedores_table', fn: upProveedores },
    { name: '029_create_insumos_proveedores_table', fn: upInsumosProveedores },
    { name: '030_create_tipos_gastos_table', fn: upTiposGastos },
    { name: '031_create_compras_insumos_proveedores_table', fn: upComprasInsumosProveedores },
    { name: '032_create_gastos_table', fn: upGastos },
    { name: '033_create_cajas_table', fn: upCajas },
    { name: '034_create_movimientos_caja_table', fn: upMovimientosCaja },
    { name: '035_create_aperturas_caja_table', fn: upAperturasCaja },
    { name: '036_create_ingresos_egresos_caja_table', fn: upIngresosEgresosCaja },
    { name: '037_create_cierres_caja_table', fn: upCierresCaja },
    { name: '038_create_dispositivos_table', fn: upDispositivos },
    { name: '039_create_tipos_reportes_table', fn: upTiposReportes },
    { name: '040_create_reportes_table', fn: upReportes },
    { name: '041_create_tipos_notificaciones_table', fn: upTiposNotificaciones },
    { name: '042_create_notificaciones_table', fn: upNotificaciones },
    { name: '043_create_logs_sistema_table', fn: upLogsSistema }
  ];

  for (const migration of migrations) {
    if (!applied.has(migration.name)) {
      try {
        console.log(`- Ejecutando ${migration.name}...`);
        migration.fn(db);
        db.prepare('INSERT INTO migrations (name, run_at) VALUES (?, ?)').run(migration.name, DateFormatter.toLocalSQLDatetime());
        console.log(`- Migracion ${migration.name} aplicada.\n`);
      } catch (err) {
        console.error(`X Error ejecutando ${migration.name}:`, err);
        throw err;
      }
    } else {
      console.log(`- Migracion ${migration.name} ya aplicada. Se omite.`);
    }
  }

  console.log('\nTodas las migraciones completadas.');
}
