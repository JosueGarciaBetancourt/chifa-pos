import { ipcMain } from "electron";
import { TipoPedido } from "../database/models/TipoPedido.js";

export function tiposPedidosHandlers() {
  ipcMain.handle("getTiposPedidos", async () => {
    try {
      return await TipoPedido.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposPedidos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getTipoPedidoById", async (event, id) => {
    try {
      return await TipoPedido.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getTipoPedidoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("searchTiposPedidosByName", async (event, name) => {
    try {
      return await TipoPedido.searchByName(name) || null;
    } catch (error) {
      console.error("[IPC ERROR searchTipoPedidoByName]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("createTipoPedido", async (event, data) => {
    try {
      return await TipoPedido.create(data);
    } catch (error) {
      console.error("[IPC ERROR createTipoPedido]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateTipoPedido", async (event, id, data) => {
    try {
      return await TipoPedido.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateTipoPedido]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteTipoPedido", async (event, id) => {
    try {
      await TipoPedido.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteTipoPedido]", error);
      return { error: error.message, deleted: false };
    }
  });
}
