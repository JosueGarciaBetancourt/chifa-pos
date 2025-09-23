// electron/handlers/gastosHandlers.js
import { ipcMain } from "electron";
import { Gasto } from "../database/models/Gasto.js";

export function gastosHandlers() {
  // Obtener todos los gastos
  ipcMain.handle("getGastos", async () => {
    try {
      return (await Gasto.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getGastos]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener gasto por ID
  ipcMain.handle("getGastoById", async (event, id) => {
    try {
      return (await Gasto.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getGastoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Crear nuevo gasto
  ipcMain.handle("createGasto", async (event, data) => {
    try {
      return await Gasto.create(data);
    } catch (error) {
      console.error("[IPC ERROR createGasto]", error);
      return { error: error.message };
    }
  });

  // Actualizar gasto
  ipcMain.handle("updateGasto", async (event, id, data) => {
    try {
      return await Gasto.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateGasto]", error);
      return { error: error.message };
    }
  });

  // Eliminar gasto
  ipcMain.handle("deleteGasto", async (event, id) => {
    try {
      await Gasto.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteGasto]", error);
      return { error: error.message, deleted: false };
    }
  });
}
