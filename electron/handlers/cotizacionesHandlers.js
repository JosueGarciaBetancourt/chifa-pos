import { ipcMain } from "electron";
import { Cotizacion } from "../database/models/Cotizacion.js";

export function cotizacionesHandlers() {
  ipcMain.handle("getCotizaciones", async () => {
    try {
      return await Cotizacion.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getCotizaciones]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getCotizacionById", async (event, id) => {
    try {
      return await Cotizacion.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getCotizacionById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("getCotizacionesByCliente", async (event, clienteId) => {
    try {
      return await Cotizacion.findByCliente(clienteId) || [];
    } catch (error) {
      console.error("[IPC ERROR getCotizacionesByCliente]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getCotizacionesByUsuario", async (event, usuarioId) => {
    try {
      return await Cotizacion.findByUsuario(usuarioId) || [];
    } catch (error) {
      console.error("[IPC ERROR getCotizacionesByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getDetallesCotizacionById", async (event, id) => {
    try {
      return await Cotizacion.findDetailsById(id) || [];
    } catch (error) {
      console.error("[IPC ERROR getDetallesCotizacionById]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createCotizacion", async (event, data) => {
    try {
      return await Cotizacion.create(data);
    } catch (error) {
      console.error("[IPC ERROR createCotizacion]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateCotizacion", async (event, id, data) => {
    try {
      return await Cotizacion.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateCotizacion]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteCotizacion", async (event, id) => {
    try {
      await Cotizacion.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteCotizacion]", error);
      return { error: error.message, deleted: false };
    }
  });
}
