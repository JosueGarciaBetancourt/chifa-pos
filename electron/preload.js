const { contextBridge, ipcRenderer } = require("electron");

const ipcChannels = {
  empresaLocal: [
    "getEmpresaLocalAll",
    "getEmpresaLocalActive",
    "getEmpresaLocalInactive",
    "getEmpresaLocalPrincipal",
    "updateEmpresaLocal",
    "disableEmpresaLocal",
    "enableEmpresaLocal"
  ],
  sedeLocal: [
    "getSedeLocalAll",
    "getSedeLocalActive",
    "getSedeLocalInactive",
    "updateSedeLocal",
    "disableSedeLocal",
    "enableSedeLocal",
  ],
  modulosSistema: [
    "getModulosSistema",
    "getModuloSistemaById",
    "getModulosSistemaActive",
    "getModulosSistemaInactive",
    "disableModuloSistema",
    "enableModuloSistema",
  ],
  accionesSistema: [
    "getAccionesSistema",
    "getAccionSistemaById",
  ],
  permisos: [
    "getPermisos",
    "getPermisoById",
    "createPermiso",
    "updatePermiso",
    "deletePermiso",
  ],
  roles: [
    "getRoles",
    "getRolById",
    "getRolesActive",
    "getRolesInactive",
    "createRol",
    "updateRol",
    "disableRol",
    "enableRol",
    "deleteRol",
  ],
  rolesPermisos: [
    "getPermisosByRolId",
    "asignarPermisosARol",
    "updatePermisosARol",
    "quitarPermisosARol",
  ],
  usuarios: [
    "getUsuarios",
    "getUsuarioById",
    "getUsuariosActive",
    "getUsuariosInactive",
    "getUsuarioByDni",
    "searchUsuariosByUsername",
    "createUsuario",
    "updateUsuario",
    "disableUsuario",
    "enableUsuario",
    "deleteUsuario",
  ],
  usuariosPermisos: [
    "getUsuariosPermisos",
    "getUsuarioPermisoById",
    "getUsuariosPermisosByUsuario",
    "createUsuarioPermiso",
    "updateUsuarioPermiso",
    "deleteUsuarioPermiso",
  ],
  categoriasProductos: [
    "getCategoriasProductos",
    "getCategoriaProductoById",
    "getCategoriasProductosActive",
    "getCategoriasProductosInactive",
    "createCategoriaProducto",
    "updateCategoriaProducto",
    "disableCategoriaProducto",
    "enableCategoriaProducto",
    "deleteCategoriaProducto",
  ],
  jornadasLaborales: [
    "getJornadasLaborales",
    "getJornadaLaboralById",
    "getJornadaLaboralIniciadaPorUsuarioId",
    "createJornadaLaboral",
    "finalizarJornadaLaboral",
    "deleteJornadaLaboral",
  ],
  productos: [
    "getProductos",
    "searchProductosByName",
    "getProductosActive",
    "getProductosInactive",
    "getProductoById",
    "createProducto",
    "updateProducto",
    "disableProducto",
    "enableProducto",
    "deleteProducto",
  ],
  tiposInsumos: [
    "getTiposInsumos",
    "getTipoInsumoById",
    "getTiposInsumosActive",
    "getTiposInsumosInactive",
    "createTipoInsumo",
    "updateTipoInsumo",
    "disableTipoInsumo",
    "enableTipoInsumo",
    "deleteTipoInsumo",
  ],
  insumos: [
    "getInsumos",
    "getInsumoById",
    "getInsumosActive",
    "getInsumosInactive",
    "createInsumo",
    "updateInsumo",
    "disableInsumo",
    "enableInsumo",
    "deleteInsumo",
  ],
  recetas: [
    "getRecetasByProductoId",
    "getRecetasByInsumoId",
    "getRecetasByProductosActive",
    "getRecetasByProductosInactive",
    "getRecetasByInsumosActive",
    "getRecetasByInsumosInactive",
    "createReceta",
    "updateReceta",
    "deleteReceta",
  ],
  clientes: [
    "getClientes",
    "getClienteById",
    "getClienteByDni",
    "getClientesActive",
    "getClientesInactive",
    "createCliente",
    "updateCliente",
    "disableCliente",
    "enableCliente",
    "deleteCliente",
  ],
  cotizaciones: [
    "getCotizaciones",
    "getCotizacionById",
    "getCotizacionesByCliente",
    "getCotizacionesByUsuario",
    "getDetallesCotizacionById",
    "createCotizacion",
    "updateCotizacion",
    "deleteCotizacion",
  ],
  estadosMesas: [
    "getEstadosMesas",
    "getEstadoMesaById",
    "searchEstadoMesaByName",
    "createEstadoMesa",
    "updateEstadoMesa",
    "deleteEstadoMesa",
  ],
  mesas: [
    "getMesas",
    "getMesaById",
    "getMesasBySede",
    "getMesaByNumero",
    "getMesasByEstado",
    "createMesa",
    "updateMesa",
    "deleteMesa",
  ],
  tiposPedidos: [
    "getTiposPedidos",
    "getTipoPedidoById",
    "searchTiposPedidosByName",
    "createTipoPedido",
    "updateTipoPedido",
    "deleteTipoPedido",
  ],
  estadosPedidos: [
    "getEstadosPedidos",
    "getEstadoPedidoById",
    "searchEstadosPedidosByName",
    "createEstadoPedido",
    "updateEstadoPedido",
    "deleteEstadoPedido",
  ],
  pedidos: [
    "getPedidos",
    "getPedidoById",
    "getPedidosBySede",
    "getPedidosByFecha",
    "getPedidosByCliente",
    "getPedidosByUsuario",
    "getPedidosByMesa",
    "getPedidosByEstado",
    "getPedidosByTipo",
    "getPedidoByCotizacionId",
    "createPedido",
    "updateEstadoDePedido",
    "updatePedido",
  ],
  estadosDetallesPedidos: [
    "getEstadosDetallesPedidos",
    "getEstadoDetallePedidoById",
    "searchEstadosDetallesPedidosByName",
    "createEstadoDetallePedido",
    "updateEstadoDetallePedido",
    "deleteEstadoDetallePedido",
  ],
  detallesPedidos: [
    "getDetalleByPedido",
    "createDetallePedido",
    "updateEstadoDeDetallePedido",
    "updateDetallePedido",
    "deleteDetallePedido",
  ],
  metodosPago: [
    "getMetodosPago",
    "getMetodoPagoById",
    "searchMetodosPagoByName",
    "createMetodoPago",
    "updateMetodoPago",
    "deleteMetodoPago",
  ],
  estadosComprobantes: [
    "getEstadosComprobantes",
    "getEstadoComprobanteById",
    "searchEstadosComprobantesByName",
    "createEstadoComprobante",
    "updateEstadoComprobante",
    "deleteEstadoComprobante",
  ], 
  tiposComprobantes: [
    "getTiposComprobantes",
    "getTipoComprobanteById",
    "searchTiposComprobantesByName",
    "createTipoComprobante",
    "updateTipoComprobante",
    "deleteTipoComprobante",
  ],
  comprobantesVenta: [
    "getComprobantesVenta",
    "getComprobanteVentaById",
    "getComprobantesVentaByPedidoId",
    "createComprobanteVenta",
    "updateEstadoDeComprobanteVenta",
    "updateXMLComprobanteVenta",
    "deleteComprobanteVenta",
  ],
  reservas: [
    "getReservas",
    "getReservaById",
    "getReservasByCliente",
    "getReservasActivas",
    "createReserva",
    "updateEstadoDeReserva",
    "deleteReserva",
  ],
  inventarioMovimientos: [
    "getInventarioMovimientos",
    "getInventarioMovimientoById",
    "getInventarioMovimientoByInsumo",
    "getInventarioMovimientoByUsuario",
    "createInventarioMovimiento",
    "deleteInventarioMovimiento",
  ],
  proveedores: [
    "getProveedores",
    "getProveedorById",
    "getProveedoresActive",
    "getProveedoresInactive",
    "createProveedor",
    "updateProveedor",
    "disableProveedor",
    "enableProveedor",
    "deleteProveedor",
  ],
  insumosProveedores: [
    "getInsumosProveedores",
    "getInsumoProveedorById",
    "getInsumosProveedoresByInsumo",
    "getInsumosProveedoresByProveedor",
    "createInsumoProveedor",
    "updateInsumoProveedor",
    "deleteInsumoProveedor",
  ],
  comprasInsumosProveedores: [
    "getComprasInsumosProveedores",
    "getCompraInsumoProveedorById",
    "getComprasInsumosProveedoresByInsumo",
    "getComprasInsumosProveedoresByProveedor",
    "createCompraInsumoProveedor",
    "updateCompraInsumoProveedor",
    "deleteCompraInsumoProveedor",
  ],
  tiposGastos: [
    "getTiposGastos",
    "getTipoGastoById",
    "getTiposGastosActive",
    "getTiposGastosInactive",
    "createTipoGasto",
    "updateTipoGasto",
    "disableTipoGasto",
    "enableTipoGasto",
    "deleteTipoGasto",
  ],
  gastos: [
    "getGastos",
    "getGastoById",
    "createGasto",
    "updateGasto",
    "deleteGasto",
  ],
  cajas: [
    "getCajas",
    "getCajaById",
    "getCajasActive",
    "getCajasInactive",
    "createCaja",
    "updateCaja",
    "disableCaja",
    "enableCaja",
    "deleteCaja",
  ],
  movimientosCajas: [
    "getMovimientosCaja",
    "getMovimientoCajaById",
    "getMovimientosCajaByJornada",
    "getMovimientosCajaByUsuario",
    "getMovimientosCajaByCaja",
    "getMovimientosCajaByTipo",
    "getEstadoCaja",
    "getResumenCaja",
    "abrirCaja",
    "cerrarCaja",
    "ingresoCaja",
    "egresoCaja",
    "updateMovimientoCaja",
    "deleteMovimientoCaja",
  ],
  dispositivos: [
    "getDispositivos",
    "getDispositivoById",
    "getDispositivoByMac",
    "getDispositivosActive",
    "getDispositivosInactive",
    "createDispositivo",
    "updateDispositivo",
    "actualizarConexion",
    "disableDispositivo",
    "enableDispositivo",
    "deleteDispositivo",
  ],
  tiposReportes: [
    "getTiposReportes",
    "getTipoReporteById",
  ],
  reportes: [
    "getReportes",
    "getReporteById",
    "createReporte",
    "updateReporte",
    "deleteReporte",
  ],
  tiposNotificaciones: [
    "getTiposNotificaciones",
    "getTipoNotificacionById",
  ],
  notificaciones: [
    "getNotificaciones",
    "getNotificacionesByUsuario",
    "getNotificacionById",
    "createNotificacion",
    "marcarLeida",
    "marcarTodasLeidas",
    "disableNotificacion",
  ],
  logsSistema: [
    "getLogsSistema",
    "getLogsByUsuario",
    "createLog",
    "deleteLog",
  ],
  inventario: [
    "getInventarioDetallado",
  ],
};

// Construir la API para el renderer process
const api = {};

// Iterar sobre cada módulo y sus métodos
for (const [moduleName, methods] of Object.entries(ipcChannels)) {
  api[moduleName] = {};
  
  // Para cada método en el módulo, crear una función que invoque el canal IPC
  methods.forEach((methodName) => {
    api[moduleName][methodName] = async (...args) => {
      try {
        //console.log(`[PRELOAD] Invocando ${methodName} con args:`, args);
        const result = await ipcRenderer.invoke(methodName, ...args);
        //console.log(`[PRELOAD] Resultado de ${methodName}:`, result);
        return result;
      } catch (error) {
        console.error(`[PRELOAD] Error en ${methodName}:`, error);
        throw error;
      }
    };
  });
}

console.log("[PRELOAD] API construida:", api);

// Exponer la API al contexto del renderer
contextBridge.exposeInMainWorld("electronAPI", api);

// También exponer algunas utilidades adicionales para debugging
contextBridge.exposeInMainWorld("electronUtils", {
  // Función para verificar si la API está disponible
  checkAPI: () => {
    console.log("[PRELOAD] API disponible:", Object.keys(api));
    return Object.keys(api);
  },
  
  // Función para enviar logs desde el renderer al main process
  log: (level, message, data = null) => {
    return ipcRenderer.invoke('system-log', { level, message, data });
  }
});