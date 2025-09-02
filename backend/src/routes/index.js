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
import tiposPedidosRouter from './tiposPedidos.js';
import pedidosRouter from './pedidos.js';
import estadosPedidosRouter from './estadosPedidos.js';
import estadosDetallesPedidosRouter from './estadosDetallesPedidos.js';
import detallesPedidosRouter from './detallesPedidos.js';
import metodosPagoRouter from './metodosPago.js';
import estadosComprobantesRouter from './estadosComprobantes.js';
import tiposComprobantesRouter from './tiposComprobantes.js';
import comprobantesVentaRouter from './comprobantesVenta.js';
import reservasRouter from './reservas.js';
import inventarioMovimientosRouter from './inventarioMovimientos.js';
import proveedoresRouter from './proveedores.js';
import insumosProveedoresRouter from './insumosProveedores.js';
import comprasInsumosProveedoresRouter from './comprasInsumosProveedores.js';
import cajasRouter from './cajas.js';
import movimientosCajaRouter from './movimientosCaja.js';

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
  { path: '/api/mesas', router: mesasRouter },
  { path: '/api/tiposPedidos', router: tiposPedidosRouter },
  { path: '/api/estadosPedidos', router: estadosPedidosRouter },
  { path: '/api/pedidos', router: pedidosRouter },
  { path: '/api/estadosDetallesPedidos', router: estadosDetallesPedidosRouter },
  { path: '/api/detallesPedidos', router: detallesPedidosRouter },
  { path: '/api/metodosPago', router: metodosPagoRouter },
  { path: '/api/estadosComprobantes', router: estadosComprobantesRouter },
  { path: '/api/tiposComprobantes', router: tiposComprobantesRouter },
  { path: '/api/comprobantesVenta', router: comprobantesVentaRouter },
  { path: '/api/reservas', router: reservasRouter },
  { path: '/api/inventarioMovimientos', router: inventarioMovimientosRouter },
  { path: '/api/proveedores', router: proveedoresRouter },
  { path: '/api/insumosProveedores', router: insumosProveedoresRouter },
  { path: '/api/comprasInsumosProveedores', router: comprasInsumosProveedoresRouter },
  { path: '/api/cajas', router: cajasRouter },
  { path: '/api/movimientosCaja', router: movimientosCajaRouter },
];
