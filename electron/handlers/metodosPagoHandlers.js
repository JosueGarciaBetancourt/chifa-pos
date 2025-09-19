import { ipcMain } from "electron";
import { MetodoPago } from "../database/models/MetodoPago.js";

export function metodosPagoHandlers() {
  // Obtener todos los métodos de pago
  ipcMain.handle("getMetodosPago", async () => {
    try {
      return await MetodoPago.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getMetodosPago]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener método de pago por ID
  ipcMain.handle("getMetodoPagoById", async (event, id) => {
    try {
      return await MetodoPago.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getMetodoPagoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Buscar métodos de pago por nombre
  ipcMain.handle("searchMetodosPagoByName", async (event, name) => {
    try {
      return await MetodoPago.searchByName(name) || [];
    } catch (error) {
      console.error("[IPC ERROR searchMetodosPagoByName]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo método de pago
  ipcMain.handle("createMetodoPago", async (event, data) => {
    try {
      return await MetodoPago.create(data);
    } catch (error) {
      console.error("[IPC ERROR createMetodoPago]", error);
      return { error: error.message };
    }
  });

  // Actualizar método de pago
  ipcMain.handle("updateMetodoPago", async (event, id, data) => {
    try {
      return await MetodoPago.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateMetodoPago]", error);
      return { error: error.message };
    }
  });

  // Eliminar método de pago
  ipcMain.handle("deleteMetodoPago", async (event, id) => {
    try {
      await MetodoPago.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteMetodoPago]", error);
      return { error: error.message, deleted: false };
    }
  });
}
