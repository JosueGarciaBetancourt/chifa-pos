import { ipcMain } from "electron";
import { Mesa } from "../database/models/Mesa.js";

export function mesasHandlers() {
  ipcMain.handle("getMesas", async () => {
    try {
      return await Mesa.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getMesas]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMesaById", async (event, id) => {
    try {
      return await Mesa.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getMesaById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getMesasBySede", async (event, sedeId) => {
    try {
      return await Mesa.findBySede(sedeId) || [];
    } catch (error) {
      console.error("[IPC ERROR getMesasBySede]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getMesaByNumero", async (event, numero) => {
    try {
      return await Mesa.findByNumero(numero) || null;
    } catch (error) {
      console.error("[IPC ERROR getMesaByNumero]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getMesasByEstado", async (event, estadoId) => {
    try {
      return await Mesa.findByEstado(estadoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getMesasByEstado]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createMesa", async (event, data) => {
    try {
      return await Mesa.create(data);
    } catch (error) {
      console.error("[IPC ERROR createMesa]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateMesa", async (event, id, data) => {
    try {
      return await Mesa.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateMesa]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteMesa", async (event, id) => {
    try {
      await Mesa.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteMesa]", error);
      return { error: error.message, deleted: false };
    }
  });
}
