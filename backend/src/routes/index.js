import empresaLocalRouter from './empresaLocal.js';
import sedeLocalRouter from './sedeLocal.js';
import rolesRouter from './roles.js';
import permisosRouter from './permisos.js';
import rolesPermisosRouter from './roles_permisos.js';
import usuariosRouter from './usuarios.js';
import jornadasLaboralesRouter from './jornadasLaborales.js';
import categoriasProductosRouter from './categoriasProductos.js';
import productosRouter from './productos.js';
import tiposInsumosRouter from './tiposInsumos.js';
import insumosRouter from './insumos.js';
import recetasRouter from './recetas.js';
import clientesRouter from './clientes.js';
import cotizacionesRouter from './cotizaciones.js';
import estadosMesasRouter from './estadosMesas.js';
import mesasRouter from './mesas.js';

export default [
  { path: '/api/empresaLocal', router: empresaLocalRouter },
  { path: '/api/sedeLocal', router: sedeLocalRouter },
  { path: '/api/roles', router: rolesRouter },
  { path: '/api/permisos', router: permisosRouter },
  { path: '/api/roles-permisos', router: rolesPermisosRouter },
  { path: '/api/usuarios', router: usuariosRouter },
  { path: '/api/jornadasLaborales', router: jornadasLaboralesRouter },
  { path: '/api/categoriasProductos', router: categoriasProductosRouter },
  { path: '/api/productos', router: productosRouter },
  { path: '/api/tiposProductos', router: tiposInsumosRouter },
  { path: '/api/tiposInsumos', router: tiposInsumosRouter },
  { path: '/api/insumos', router: insumosRouter },
  { path: '/api/recetas', router: recetasRouter },
  { path: '/api/clientes', router: clientesRouter },
  { path: '/api/cotizaciones', router: cotizacionesRouter },
  { path: '/api/estadosMesas', router: estadosMesasRouter },
  { path: '/api/mesas', router: mesasRouter }

];
