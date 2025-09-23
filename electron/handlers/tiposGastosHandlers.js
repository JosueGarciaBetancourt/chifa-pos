// electron/handlers/tiposGastosHandlers.js
import { ipcMain } from "electron";
import { TipoGasto } from "../database/models/TipoGasto.js";

export function tiposGastosHandlers() {
  // Obtener todos los tipos de gasto
  ipcMain.handle("getTiposGastos", async () => {
    try {
      return (await TipoGasto.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposGastos]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener tipo de gasto por ID
  ipcMain.handle("getTipoGastoById", async (event, id) => {
    try {
      return (await TipoGasto.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getTipoGastoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener tipos de gasto activos
  ipcMain.handle("getTiposGastosActive", async () => {
    try {
      return (await TipoGasto.selectActive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposGastosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener tipos de gasto inactivos
  ipcMain.handle("getTiposGastosInactive", async () => {
    try {
      return (await TipoGasto.selectInactive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposGastosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo tipo de gasto
  ipcMain.handle("createTipoGasto", async (event, data) => {
    try {
      return await TipoGasto.create(data);
    } catch (error) {
      console.error("[IPC ERROR createTipoGasto]", error);
      return { error: error.message };
    }
  });

  // Actualizar tipo de gasto
  ipcMain.handle("updateTipoGasto", async (event, id, data) => {
    try {
      return await TipoGasto.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateTipoGasto]", error);
      return { error: error.message };
    }
  });

  // Deshabilitar tipo de gasto
  ipcMain.handle("disableTipoGasto", async (event, id) => {
    try {
      await TipoGasto.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableTipoGasto]", error);
      return { error: error.message, disabled: false };
    }
  });

  // Habilitar tipo de gasto
  ipcMain.handle("enableTipoGasto", async (event, id) => {
    try {
      return await TipoGasto.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableTipoGasto]", error);
      return { error: error.message };
    }
  });

  // Eliminar tipo de gasto
  ipcMain.handle("deleteTipoGasto", async (event, id) => {
    try {
      await TipoGasto.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteTipoGasto]", error);
      return { error: error.message, deleted: false };
    }
  });
}
