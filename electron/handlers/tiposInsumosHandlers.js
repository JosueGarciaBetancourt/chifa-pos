// electron/ipc/tiposInsumosHandlers.js
import { ipcMain } from "electron";
import { TipoInsumo } from "../database/models/TipoInsumo.js";

export function tiposInsumosHandlers() {
  ipcMain.handle("getTiposInsumos", async () => {
    try {
      return await TipoInsumo.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposInsumos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getTipoInsumoById", async (event, id) => {
    try {
      return await TipoInsumo.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getTipoInsumoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getTiposInsumosActive", async () => {
    try {
      return await TipoInsumo.selectActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposInsumosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getTiposInsumosInactive", async () => {
    try {
      return await TipoInsumo.selectInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposInsumosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createTipoInsumo", async (event, data) => {
    try {
      return await TipoInsumo.create(data);
    } catch (error) {
      console.error("[IPC ERROR createTipoInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateTipoInsumo", async (event, id, data) => {
    try {
      return await TipoInsumo.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateTipoInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("disableTipoInsumo", async (event, id) => {
    try {
      await TipoInsumo.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableTipoInsumo]", error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle("enableTipoInsumo", async (event, id) => {
    try {
      return await TipoInsumo.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableTipoInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteTipoInsumo", async (event, id) => {
    try {
      await TipoInsumo.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteTipoInsumo]", error);
      return { error: error.message, deleted: false };
    }
  });
}
