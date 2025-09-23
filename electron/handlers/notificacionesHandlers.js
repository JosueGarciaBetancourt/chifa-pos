// electron/handlers/notificacionesHandlers.js
import { ipcMain } from "electron";
import { Notificacion } from "../database/models/Notificacion.js";

export function notificacionesHandlers() {
  // =================== CONSULTAS ===================

  ipcMain.handle("getNotificaciones", async () => {
    try {
      return await Notificacion.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getNotificaciones]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getNotificacionesByUsuario", async (event, usuarioId) => {
    try {
      return await Notificacion.findByUsuario(usuarioId) || [];
    } catch (error) {
      console.error("[IPC ERROR getNotificacionesByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getNotificacionById", async (event, id) => {
    try {
      const notificacion = await Notificacion.findById(id);
      return notificacion || { error: "Notificación no encontrada" };
    } catch (error) {
      console.error("[IPC ERROR getNotificacionById]", error);
      return { error: error.message, data: null };
    }
  });

  // =================== CREAR ===================
  ipcMain.handle("createNotificacion", async (event, data) => {
    try {
      return await Notificacion.create(data);
    } catch (error) {
      console.error("[IPC ERROR createNotificacion]", error);
      return { error: error.message };
    }
  });

  // =================== MARCAR LEÍDAS ===================
  ipcMain.handle("marcarLeida", async (event, id, usuario_id) => {
    try {
      await Notificacion.marcarLeida(id, usuario_id);
      return { message: "Notificación marcada como leída" };
    } catch (error) {
      console.error("[IPC ERROR marcarLeida]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("marcarTodasLeidas", async (event, usuarioId) => {
    try {
      await Notificacion.marcarTodasLeidas(usuarioId);
      return { message: "Todas las notificaciones marcadas como leídas" };
    } catch (error) {
      console.error("[IPC ERROR marcarTodasLeidas]", error);
      return { error: error.message };
    }
  });

  // =================== DESHABILITAR ===================
  ipcMain.handle("disableNotificacion", async (event, id) => {
    try {
      await Notificacion.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableNotificacion]", error);
      return { error: error.message };
    }
  });
}
