// electron/ipc/insumosHandlers.js
import { ipcMain } from "electron";
import { Insumo } from "../database/models/Insumo.js";

export function insumosHandlers() {
  ipcMain.handle("getInsumos", async () => {
    try {
      return await Insumo.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getInsumos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getInsumoById", async (event, id) => {
    try {
      return await Insumo.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getInsumoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getInsumosActive", async () => {
    try {
      return await Insumo.selectActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getInsumosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getInsumosInactive", async () => {
    try {
      return await Insumo.selectInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getInsumosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createInsumo", async (event, data) => {
    try {
      return await Insumo.create(data);
    } catch (error) {
      console.error("[IPC ERROR createInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateInsumo", async (event, id, data) => {
    try {
      return await Insumo.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("disableInsumo", async (event, id) => {
    try {
      await Insumo.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableInsumo]", error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle("enableInsumo", async (event, id) => {
    try {
      return await Insumo.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableInsumo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteInsumo", async (event, id) => {
    try {
      await Insumo.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteInsumo]", error);
      return { error: error.message, deleted: false };
    }
  });
}
