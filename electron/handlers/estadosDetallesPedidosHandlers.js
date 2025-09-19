import { ipcMain } from "electron";
import { EstadoDetallePedido } from "../database/models/EstadoDetallePedido.js";

export function estadosDetallesPedidosHandlers() {
  // Obtener todos los estados de detalles de pedidos
  ipcMain.handle("getEstadosDetallesPedidos", async () => {
    try {
      return await EstadoDetallePedido.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getEstadosDetallesPedidos]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener estado detalle por ID
  ipcMain.handle("getEstadoDetallePedidoById", async (event, id) => {
    try {
      return await EstadoDetallePedido.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getEstadoDetallePedidoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Buscar por nombre
  ipcMain.handle("searchEstadosDetallesPedidosByName", async (event, name) => {
    try {
      return await EstadoDetallePedido.searchByName(name) || [];
    } catch (error) {
      console.error("[IPC ERROR searchEstadosDetallesPedidosByName]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo estado detalle
  ipcMain.handle("createEstadoDetallePedido", async (event, data) => {
    try {
      return await EstadoDetallePedido.create(data);
    } catch (error) {
      console.error("[IPC ERROR createEstadoDetallePedido]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado detalle
  ipcMain.handle("updateEstadoDetallePedido", async (event, id, data) => {
    try {
      return await EstadoDetallePedido.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateDetallePedido]", error);
      return { error: error.message };
    }
  });

  // Eliminar estado detalle
  ipcMain.handle("deleteEstadoDetallePedido", async (event, id) => {
    try {
      await EstadoDetallePedido.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteEstadoDetallePedido]", error);
      return { error: error.message, deleted: false };
    }
  });
}
