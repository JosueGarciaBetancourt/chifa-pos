// Importa todos los seeders de la carpeta seeders
import { seed as seedProductos } from './seeders/productosSeeder.js';
import { seed as seedUsuarios } from './seeders/usuariosSeeder.js';
import { seed as seedClientes } from './seeders/clientesSeeder.js';
import { seed as seedMesas } from './seeders/mesasSeeder.js';
import { seed as seedPedidos } from './seeders/pedidosSeeder.js';
import { seed as seedReservas } from './seeders/reservasSeeder.js';
import { seed as seedDetallesPedido } from './seeders/detalles_pedidoSeeder.js';

export function runSeeders(db) {
  console.log('\n🌱 Ejecutando seeders...\n');

  try {
    seedProductos(db);
    console.log('✅ Productos insertados.');

    seedUsuarios(db);
    console.log('✅ Usuarios insertados.');

    seedClientes(db);
    console.log('✅ Clientes insertados.');

    seedMesas(db);
    console.log('✅ Mesas insertadas.');

    seedPedidos(db);
    console.log('✅ Pedidos insertados.');

    seedReservas(db);
    console.log('✅ Reservas insertadas.');

    seedDetallesPedido(db);
    console.log('✅ Detalles de pedido insertados.');

    console.log('\n🎉 Todos los seeders ejecutados correctamente.');
  } catch (err) {
    console.error('❌ Error ejecutando seeders:', err);
    throw err;
  }
}
