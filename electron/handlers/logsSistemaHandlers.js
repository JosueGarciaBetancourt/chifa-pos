// electron/handlers/logsSistemaHandlers.js
import { ipcMain } from "electron";
import { LogSistema } from "../database/models/LogSistema.js";

export function logsSistemaHandlers() {
  // =================== CONSULTAS ===================
  ipcMain.handle("getLogsSistema", async () => {
    try {
      return await LogSistema.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getLogsSistema]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getLogsByUsuario", async (event, usuarioId) => {
    try {
      return await LogSistema.findByUsuario(usuarioId) || [];
    } catch (error) {
      console.error("[IPC ERROR getLogsByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  // =================== CREAR ===================
  ipcMain.handle("createLog", async (event, data) => {
    try {
      await LogSistema.create(data);
      return { message: "Log creado correctamente" };
    } catch (error) {
      console.error("[IPC ERROR createLog]", error);
      return { error: error.message };
    }
  });

  // =================== ELIMINAR ===================
  ipcMain.handle("deleteLog", async (event, id) => {
    try {
      await LogSistema.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteLog]", error);
      return { error: error.message };
    }
  });
}
