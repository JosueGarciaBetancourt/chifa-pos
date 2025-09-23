// electron/handlers/tiposNotificacionesHandlers.js
import { ipcMain } from "electron";
import { TipoNotificacion } from "../database/models/TipoNotificacion.js";

export function tiposNotificacionesHandlers() {
  // =================== CONSULTAS ===================
  ipcMain.handle("getTiposNotificaciones", async () => {
    try {
      return await TipoNotificacion.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getTiposNotificaciones]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getTipoNotificacionById", async (event, id) => {
    try {
      const tipo = await TipoNotificacion.findById(id);
      return tipo || { error: "Tipo de notificación no encontrado" };
    } catch (error) {
      console.error("[IPC ERROR getTipoNotificacionById]", error);
      return { error: error.message, data: null };
    }
  });
}
