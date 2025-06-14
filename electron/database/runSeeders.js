import { seedProductos } from './seeders/productosSeeder.js';

export function runSeeders(db) {
  console.log('- Ejecutando seeders...');
  seedProductos(db);
  // Agrega más seeders aquí si quieres
  console.log('- Seeders ejecutados correctamente.');
}