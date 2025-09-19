import { ipcMain } from "electron";
import { Pedido } from "../database/models/Pedido.js";
import { CalculosFinancieros } from "../database/utils/calculosFinancieros.js";

export function pedidosHandlers() {
  // Obtener todos los pedidos
  ipcMain.handle("getPedidos", async () => {
    try {
      return await Pedido.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidos]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedido por ID
  ipcMain.handle("getPedidoById", async (event, id) => {
    try {
      return await Pedido.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getPedidoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener pedidos por sede
  ipcMain.handle("getPedidosBySede", async (event, sedeId) => {
    try {
      return await Pedido.findBySede(sedeId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosBySede]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos en un rango de fechas
  ipcMain.handle("getPedidosByFecha", async (event, fechaInicio, fechaFin) => {
    try {
      return await Pedido.findByFecha(fechaInicio, fechaFin) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByFecha]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos por cliente
  ipcMain.handle("getPedidosByCliente", async (event, clienteId) => {
    try {
      return await Pedido.findByCliente(clienteId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByCliente]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos por usuario
  ipcMain.handle("getPedidosByUsuario", async (event, usuarioId) => {
    try {
      return await Pedido.findByUsuario(usuarioId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos por mesa
  ipcMain.handle("getPedidosByMesa", async (event, mesaId) => {
    try {
      return await Pedido.findByMesa(mesaId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByMesa]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos por estado
  ipcMain.handle("getPedidosByEstado", async (event, estadoId) => {
    try {
      return await Pedido.findByEstado(estadoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByEstado]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener pedidos por tipo
  ipcMain.handle("getPedidosByTipo", async (event, tipoId) => {
    try {
      return await Pedido.findByTipo(tipoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getPedidosByTipo]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener un pedido desde cotización
  ipcMain.handle("getPedidoByCotizacionId", async (event, cotizacionId) => {
    try {
      return await Pedido.findByCotizacionId(cotizacionId) || null;
    } catch (error) {
      console.error("[IPC ERROR getPedidoByCotizacionId]", error);
      return { error: error.message, data: null };
    }
  });

  // Crear pedido
  ipcMain.handle("createPedido", async (event, data) => {
    try {
      const { total } = data;
      const subTotal = CalculosFinancieros.calcularSubtotal(total);
      const igv = CalculosFinancieros.calcularIGV(total);

      return await Pedido.create({ ...data, subTotal, igv });
    } catch (error) {
      console.error("[IPC ERROR createPedido]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado del pedido
  ipcMain.handle("updateEstado", async (event, id, estado_id) => {
    try {
      return await Pedido.updateEstado(id, estado_id);
    } catch (error) {
      console.error("[IPC ERROR updateEstado]", error);
      return { error: error.message };
    }
  });

  // Actualizar pedido completo
  ipcMain.handle("updatePedido", async (event, id, data) => {
    try {
      return await Pedido.updatePedido(id, data);
    } catch (error) {
      console.error("[IPC ERROR updatePedido]", error);
      return { error: error.message };
    }
  });
}
