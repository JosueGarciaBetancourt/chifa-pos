import { ipcMain } from "electron";
import { DetallePedido } from "../database/models/DetallePedido.js";

export function detallesPedidosHandlers() {
  // Obtener detalles por pedido
  ipcMain.handle("getDetalleByPedido", async (event, pedidoId) => {
    try {
      return await DetallePedido.findByPedidoId(pedidoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getDetalleByPedido]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo detalle de pedido
  ipcMain.handle("createDetallePedido", async (event, pedidoId, data) => {
    try {
      return await DetallePedido.create(pedidoId, data);
    } catch (error) {
      console.error("[IPC ERROR createDetallePedido]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado de un detalle
  ipcMain.handle("updateSoloEstado", async (event, id, estado_id) => {
    try {
      return await DetallePedido.updateEstado(id, estado_id);
    } catch (error) {
      console.error("[IPC ERROR updateEstado]", error);
      return { error: error.message };
    }
  });

  // Actualizar un detalle de pedido
  ipcMain.handle("updateDetallePedido", async (event, id, data) => {
    try {
      return await DetallePedido.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateDetallePedido]", error);
      return { error: error.message };
    }
  });

  // Eliminar un detalle de pedido
  ipcMain.handle("deleteDetallePedido", async (event, id) => {
    try {
      await DetallePedido.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteDetallePedido]", error);
      return { error: error.message, deleted: false };
    }
  });
}
