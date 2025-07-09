// electron/database/runSeeders.js
import { seed as seedAll } from './seeders/index.js';

export function runSeeders(db) {
  console.log('\n🌱 Ejecutando seeders...\n');
  
  try {
    seedAll(db);
    console.log('\n🎉 Todos los seeders ejecutados correctamente.');
  } catch (err) {
    console.error('❌ Error ejecutando seeders:', err);
    throw err;
  }
}