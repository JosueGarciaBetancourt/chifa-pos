// electron/handlers/cajasHandlers.js
import { ipcMain } from "electron";
import { Caja } from "../database/models/Caja.js";

export function cajasHandlers() {
  // Obtener todas las cajas
  ipcMain.handle("getCajas", async () => {
    try {
      return (await Caja.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getCajas]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener caja por ID
  ipcMain.handle("getCajaById", async (event, id) => {
    try {
      return (await Caja.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getCajaById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener cajas activas
  ipcMain.handle("getCajasActive", async () => {
    try {
      return (await Caja.selectActive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getCajasActive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener cajas inactivas
  ipcMain.handle("getCajasInactive", async () => {
    try {
      return (await Caja.selectInactive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getCajasInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nueva caja
  ipcMain.handle("createCaja", async (event, data) => {
    try {
      return await Caja.create(data);
    } catch (error) {
      console.error("[IPC ERROR createCaja]", error);
      return { error: error.message };
    }
  });

  // Actualizar caja
  ipcMain.handle("updateCaja", async (event, id, data) => {
    try {
      return await Caja.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateCaja]", error);
      return { error: error.message };
    }
  });

  // Deshabilitar caja
  ipcMain.handle("disableCaja", async (event, id) => {
    try {
      await Caja.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableCaja]", error);
      return { error: error.message, disabled: false };
    }
  });

  // Habilitar caja
  ipcMain.handle("enableCaja", async (event, id) => {
    try {
      return await Caja.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableCaja]", error);
      return { error: error.message };
    }
  });

  // Eliminar caja
  ipcMain.handle("deleteCaja", async (event, id) => {
    try {
      await Caja.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteCaja]", error);
      return { error: error.message, deleted: false };
    }
  });
}
