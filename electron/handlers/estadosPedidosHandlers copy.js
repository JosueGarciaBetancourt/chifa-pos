import { ipcMain } from "electron";
import { EstadoPedido } from "../database/models/EstadoPedido.js";

export function estadosPedidosHandlers() {
  ipcMain.handle("getEstadosPedidos", async () => {
    try {
      return await EstadoPedido.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getEstadosPedidos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getEstadoPedidoById", async (event, id) => {
    try {
      return await EstadoPedido.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getEstadoPedidoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("searchEstadosPedidosByName", async (event, name) => {
    try {
      return await EstadoPedido.searchByName(name) || null;
    } catch (error) {
      console.error("[IPC ERROR searchByName]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("createEstadoPedido", async (event, data) => {
    try {
      return await EstadoPedido.create(data);
    } catch (error) {
      console.error("[IPC ERROR createEstadoPedido]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateEstadoPedido", async (event, id, data) => {
    try {
      return await EstadoPedido.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateEstadoPedido]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteEstadoPedido", async (event, id) => {
    try {
      await EstadoPedido.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteEstadoPedido]", error);
      return { error: error.message, deleted: false };
    }
  });
}
