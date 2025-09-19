import { ipcMain } from "electron";
import { EstadoMesa } from "../database/models/EstadoMesa.js";

export function estadosMesasHandlers() {
  ipcMain.handle("getEstadosMesas", async () => {
    try {
      return await EstadoMesa.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getEstadosMesas]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getEstadoMesaById", async (event, id) => {
    try {
      return await EstadoMesa.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getEstadoMesaById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("searchEstadoMesaByName", async (event, name) => {
    try {
      return await EstadoMesa.searchByName(name) || null;
    } catch (error) {
      console.error("[IPC ERROR searchEstadoMesaByName]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("createEstadoMesa", async (event, data) => {
    try {
      return await EstadoMesa.create(data);
    } catch (error) {
      console.error("[IPC ERROR createEstadoMesa]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateEstadoMesa", async (event, id, data) => {
    try {
      return await EstadoMesa.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateEstadoMesa]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteEstadoMesa", async (event, id) => {
    try {
      await EstadoMesa.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteEstadoMesa]", error);
      return { error: error.message, deleted: false };
    }
  });
}
