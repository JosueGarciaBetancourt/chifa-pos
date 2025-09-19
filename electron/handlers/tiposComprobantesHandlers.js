import { ipcMain } from "electron";
import { TipoComprobante } from "../database/models/TipoComprobante.js";

export function tiposComprobantesHandlers() {
  // Obtener todos los tipos de comprobantes
  ipcMain.handle("getTiposComprobantes", async () => {
    try {
      return await TipoComprobante.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposComprobantes]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener tipo de comprobante por ID
  ipcMain.handle("getTipoComprobanteById", async (event, id) => {
    try {
      return await TipoComprobante.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getTipoComprobanteById]", error);
      return { error: error.message, data: null };
    }
  });

  // Buscar tipos de comprobantes por nombre
  ipcMain.handle("searchTiposComprobantesByName", async (event, name) => {
    try {
      return await TipoComprobante.searchByName(name) || [];
    } catch (error) {
      console.error("[IPC ERROR searchTiposComprobantesByName]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo tipo de comprobante
  ipcMain.handle("createTipoComprobante", async (event, data) => {
    try {
      return await TipoComprobante.create(data);
    } catch (error) {
      console.error("[IPC ERROR createTipoComprobante]", error);
      return { error: error.message };
    }
  });

  // Actualizar tipo de comprobante
  ipcMain.handle("updateTipoComprobante", async (event, id, data) => {
    try {
      return await TipoComprobante.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateTipoComprobante]", error);
      return { error: error.message };
    }
  });

  // Eliminar tipo de comprobante
  ipcMain.handle("deleteTipoComprobante", async (event, id) => {
    try {
      await TipoComprobante.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteTipoComprobante]", error);
      return { error: error.message, deleted: false };
    }
  });
}
