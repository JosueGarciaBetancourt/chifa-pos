import categoriasProductosRouter from './categoriasProductos.js';
import clienteRouter from './cliente.js';
import compraInsumoProveedorRouter from './compraInsumoProveedor.js';
import comprobanteRouter from './comprobante.js';
import cotizacionRouter from './cotizacion.js';
import detallePedidoRouter from './detallePedido.js';
import dispositivoRouter from './dispositivo.js';
import empresaLocalRouter from './empresaLocal.js';
import estadoComprobanteRouter from './estadoComprobante.js';
import estadoDetallePedidoRouter from './estadoDetallePedido.js';
import estadoMesaRouter from './estadoMesa.js';
import estadoPedidoRouter from './estadoPedido.js';
import insumoRouter from './insumo.js';
import insumoProveedorRouter from './insumoProveedor.js';
import inventarioMovimientoRouter from './inventarioMovimiento.js';
import jornadasLaboralesRouter from './jornadasLaborales.js';
import logSistemaRouter from './logSistema.js';
import mesaRouter from './mesa.js';
import metodoPagoRouter from './metodoPago.js';
import movimientoCajaRouter from './movimientoCaja.js';
import notificacionRouter from './notificacion.js';
import pedidoRouter from './pedido.js';
import permisosRouter from './permisos.js';
import productoRouter from './producto.js';
import proveedorRouter from './proveedor.js';
import recetaRouter from './receta.js';
import reservaRouter from './reserva.js';
import rolRouter from './rol.js';
import sedeLocalRouter from './sedeLocal.js';
import tipoComprobanteRouter from './tipoComprobante.js';
import tipoInsumoRouter from './tipoInsumo.js';
import tipoNotificacionRouter from './tipoNotificacion.js';
import tipoPedidoRouter from './tipoPedido.js';
import usuarioRouter from './usuario.js';

export default [
  { path: '/api/categorias-productos', router: categoriasProductosRouter },
  { path: '/api/clientes', router: clienteRouter },
  { path: '/api/compras-insumos-proveedores', router: compraInsumoProveedorRouter },
  { path: '/api/comprobantes', router: comprobanteRouter },
  { path: '/api/cotizaciones', router: cotizacionRouter },
  { path: '/api/detalles-pedidos', router: detallePedidoRouter },
  { path: '/api/dispositivos', router: dispositivoRouter },
  { path: '/api/empresa-local', router: empresaLocalRouter },
  { path: '/api/estados-comprobantes', router: estadoComprobanteRouter },
  { path: '/api/estados-detalles-pedidos', router: estadoDetallePedidoRouter },
  { path: '/api/estados-mesas', router: estadoMesaRouter },
  { path: '/api/estados-pedidos', router: estadoPedidoRouter },
  { path: '/api/insumos', router: insumoRouter },
  { path: '/api/insumos-proveedores', router: insumoProveedorRouter },
  { path: '/api/inventario-movimientos', router: inventarioMovimientoRouter },
  { path: '/api/jornadas-laborales', router: jornadasLaboralesRouter },
  { path: '/api/logs-sistema', router: logSistemaRouter },
  { path: '/api/mesas', router: mesaRouter },
  { path: '/api/metodos-pago', router: metodoPagoRouter },
  { path: '/api/movimientos-caja', router: movimientoCajaRouter },
  { path: '/api/notificaciones', router: notificacionRouter },
  { path: '/api/pedidos', router: pedidoRouter },
  { path: '/api/permisos', router: permisosRouter },
  { path: '/api/productos', router: productoRouter },
  { path: '/api/proveedores', router: proveedorRouter },
  { path: '/api/recetas', router: recetaRouter },
  { path: '/api/reservas', router: reservaRouter },
  { path: '/api/roles', router: rolRouter },
  { path: '/api/sedes-locales', router: sedeLocalRouter },
  { path: '/api/tipos-comprobantes', router: tipoComprobanteRouter },
  { path: '/api/tipos-insumos', router: tipoInsumoRouter },
  { path: '/api/tipos-notificaciones', router: tipoNotificacionRouter },
  { path: '/api/tipos-pedidos', router: tipoPedidoRouter },
  { path: '/api/usuarios', router: usuarioRouter }
];