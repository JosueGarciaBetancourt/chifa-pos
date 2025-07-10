import { seed as seedRoles } from './rolesSeeder.js';
import { seed as seedUsuarios } from './usuariosSeeder.js';
import { seed as seedClientes } from './clientesSeeder.js';
import { seed as seedCategorias } from './categoriasSeeder.js';
import { seed as seedInsumos } from './insumosSeeder.js';
import { seed as seedProductos } from './productosSeeder.js';
import { seed as seedMesas } from './mesasSeeder.js';
import { seed as seedRecetas } from './recetasSeeder.js';
import { seed as seedPedidos } from './pedidosSeeder.js';
import { seed as seedDetallesPedido } from './detalles_pedidoSeeder.js';
import { seed as seedReservas } from './reservasSeeder.js';
import { seed as seedComprobantes } from './comprobantesSeeder.js';
import { seed as seedMovimientosCaja } from './movimientos_cajaSeeder.js';
import { seed as seedInventarioMovimientos } from './inventario_movimientosSeeder.js';
import { seed as seedCotizaciones } from './cotizacionesSeeder.js';
import { seed as seedDispositivos } from './dispositivosSeeder.js';

export function seed(db) {
  // Ejecutar en orden para mantener las relaciones
  seedRoles(db);
  seedUsuarios(db);
  seedClientes(db);
  seedCategorias(db);
  seedInsumos(db);
  seedProductos(db);
  seedMesas(db);
  seedRecetas(db);
  seedPedidos(db);
  seedDetallesPedido(db);
  seedReservas(db);
  seedComprobantes(db);
  seedMovimientosCaja(db);
  seedInventarioMovimientos(db);
  seedCotizaciones(db);
  seedDispositivos(db);
  
  console.log('[SEEDER] Todos los datos iniciales insertados correctamente');
}