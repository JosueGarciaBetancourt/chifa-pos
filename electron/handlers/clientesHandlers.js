import { ipcMain } from "electron";
import { Cliente } from "../database/models/Cliente.js";

export function clientesHandlers() {
  ipcMain.handle("getClientes", async () => {
    try {
      return await Cliente.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getClientes]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getClienteById", async (event, id) => {
    try {
      return await Cliente.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getClienteById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getClienteByDni", async (event, dni) => {
    try {
      return await Cliente.findByDni(dni) || null;
    } catch (error) {
      console.error("[IPC ERROR getClienteByDni]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getClientesActive", async () => {
    try {
      return await Cliente.selectActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getClientesActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getClientesInactive", async () => {
    try {
      return await Cliente.selectInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getClientesInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createCliente", async (event, data) => {
    try {
      return await Cliente.create(data);
    } catch (error) {
      console.error("[IPC ERROR createCliente]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateCliente", async (event, id, data) => {
    try {
      return await Cliente.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateCliente]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("disableCliente", async (event, id) => {
    try {
      await Cliente.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableCliente]", error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle("enableCliente", async (event, id) => {
    try {
      return await Cliente.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableCliente]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteCliente", async (event, id) => {
    try {
      await Cliente.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteCliente]", error);
      return { error: error.message, deleted: false };
    }
  });
}
