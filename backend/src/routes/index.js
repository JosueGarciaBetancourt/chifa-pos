import empresaLocalRouter from './empresaLocal.js';
import sedeLocalRouter from './sedeLocal.js';
import rolesRouter from './roles.js';
import productosRouter from './productos.js';
import insumosRouter from './insumos.js';
import tiposInsumosRouter from './tiposInsumos.js';

export default [
  { path: '/api/empresaLocal', router: empresaLocalRouter },
  { path: '/api/sedeLocal', router: sedeLocalRouter },
  { path: '/api/roles', router: rolesRouter },
  { path: '/api/productos', router: productosRouter },
  { path: '/api/insumos', router: insumosRouter },
  { path: '/api/tiposInsumos', router: tiposInsumosRouter },
];
