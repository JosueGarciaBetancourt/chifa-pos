// electron/handlers/dispositivosHandlers.js
import { ipcMain } from "electron";
import { Dispositivo } from "../database/models/Dispositivo.js";

export function dispositivosHandlers() {
  // =================== CONSULTAS GENERALES ===================
  ipcMain.handle("getDispositivos", async () => {
    try {
      return Dispositivo.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getDispositivos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getDispositivoById", async (event, id) => {
    try {
      return Dispositivo.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getDispositivoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getDispositivoByMac", async (event, mac) => {
    try {
      return Dispositivo.findByMac(mac) || null;
    } catch (error) {
      console.error("[IPC ERROR getDispositivoByMac]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getDispositivosActive", async () => {
    try {
      return Dispositivo.selectActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getDispositivosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getDispositivosInactive", async () => {
    try {
      return Dispositivo.selectInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getDispositivosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  // =================== OPERACIONES CRUD ===================
  ipcMain.handle("createDispositivo", async (event, data) => {
    try {
      return Dispositivo.create(data);
    } catch (error) {
      console.error("[IPC ERROR createDispositivo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateDispositivo", async (event, mac, data) => {
    try {
      return Dispositivo.update(mac, data);
    } catch (error) {
      console.error("[IPC ERROR updateDispositivo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("actualizarConexion", async (event, mac, ip_address) => {
    try {
      return Dispositivo.actualizarConexion(mac, ip_address);
    } catch (error) {
      console.error("[IPC ERROR actualizarConexion]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("disableDispositivo", async (event, mac) => {
    try {
      await Dispositivo.disable(mac);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableDispositivo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("enableDispositivo", async (event, mac) => {
    try {
      return Dispositivo.enable(mac);
    } catch (error) {
      console.error("[IPC ERROR enableDispositivo]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteDispositivo", async (event, mac) => {
    try {
      await Dispositivo.delete(mac);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteDispositivo]", error);
      return { error: error.message };
    }
  });
}
