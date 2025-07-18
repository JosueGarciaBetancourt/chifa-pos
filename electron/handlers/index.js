import { insumosHandlers } from './insumosHandlers.js';
import { productosHandlers } from './productosHandlers.js';
import { tiposInsumosHandlers } from './tiposInsumosHandlers.js';
// Agrega aquí más handlers según vayas creando

/**
 * Registra todos los handlers IPC disponibles.
 * @param {Database} db - Instancia de conexión a la base de datos
 */
export function registerAllIpcHandlers(db) {
  insumosHandlers(db);
  productosHandlers(db);
  tiposInsumosHandlers(db);
  // Llama aquí cualquier nuevo handler
}
