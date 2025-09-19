import { ipcMain } from "electron";
import { EstadoComprobante } from "../database/models/EstadoComprobante.js";

export function estadosComprobantesHandlers() {
  // Obtener todos los estados de comprobantes
  ipcMain.handle("getEstadosComprobantes", async () => {
    try {
      return await EstadoComprobante.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getEstadosComprobantes]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener estado de comprobante por ID
  ipcMain.handle("getEstadoComprobanteById", async (event, id) => {
    try {
      return await EstadoComprobante.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getEstadoComprobanteById]", error);
      return { error: error.message, data: null };
    }
  });

  // Buscar estados de comprobantes por nombre
  ipcMain.handle("searchEstadosComprobantesByName", async (event, name) => {
    try {
      return await EstadoComprobante.searchByName(name) || [];
    } catch (error) {
      console.error("[IPC ERROR searchByNameEstadoComprobante]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo estado de comprobante
  ipcMain.handle("createEstadoComprobante", async (event, data) => {
    try {
      return await EstadoComprobante.create(data);
    } catch (error) {
      console.error("[IPC ERROR createEstadoComprobante]", error);
      return { error: error.message };
    }
  });

  // Actualizar estado de comprobante
  ipcMain.handle("updateEstadoComprobante", async (event, id, data) => {
    try {
      return await EstadoComprobante.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateEstadoComprobante]", error);
      return { error: error.message };
    }
  });

  // Eliminar estado de comprobante
  ipcMain.handle("deleteEstadoComprobante", async (event, id) => {
    try {
      await EstadoComprobante.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteEstadoComprobante]", error);
      return { error: error.message, deleted: false };
    }
  });
}
