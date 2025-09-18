import { empresaLocalHandlers } from './empresaLocalHandlers.js';
import { sedeLocalHandlers } from './sedeLocalHandlers.js';
import { modulosSistemaHandlers } from './modulosSistemaHandlers.js';
import { accionesSistemaHandlers } from './accionesSistemaHandlers.js';
import { permisosHandlers } from './permisosHandlers.js';
import { rolesHandlers } from './rolesHandlers.js';
import { rolesPermisosHandlers } from './rolesPermisosHandlers.js';
import { usuariosHandlers } from './usuariosHandlers.js';
import { usuariosPermisosHandlers } from './usuariosPermisosHandlers.js';
import { categoriasProductosHandlers } from './categoriasProductosHandlers.js';
import { jornadasLaboralesHandlers } from './jornadasLaboralesHandlers.js';
import { productosHandlers } from './productosHandlers.js';
import { tiposInsumosHandlers } from './tiposInsumosHandlers.js';
import { insumosHandlers } from './insumosHandlers.js';

/**
 * Registra todos los handlers IPC disponibles.
 * @param {Database} db - Instancia de conexión a la base de datos
 */
export function registerAllIpcHandlers(db) {
  empresaLocalHandlers(db);
  sedeLocalHandlers(db);
  modulosSistemaHandlers(db);
  accionesSistemaHandlers(db);
  permisosHandlers(db);
  rolesHandlers(db);
  rolesPermisosHandlers(db);  
  usuariosHandlers(db);
  usuariosPermisosHandlers(db);
  categoriasProductosHandlers(db);
  jornadasLaboralesHandlers(db);
  productosHandlers(db);
  tiposInsumosHandlers(db);

  insumosHandlers(db);
}
