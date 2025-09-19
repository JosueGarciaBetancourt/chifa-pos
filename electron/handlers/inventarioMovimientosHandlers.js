// electron/handlers/inventarioMovimientosHandlers.js
import { ipcMain } from "electron";
import { InventarioMovimiento } from "../database/models/InventarioMovimiento.js";

export function inventarioMovimientosHandlers() {
  // Obtener todos los movimientos de inventario
  ipcMain.handle("getInventarioMovimientos", async () => {
    try {
      return (await InventarioMovimiento.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getInventarioMovimientos]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener un movimiento de inventario por ID
  ipcMain.handle("getInventarioMovimientoById", async (event, id) => {
    try {
      return (await InventarioMovimiento.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getInventarioMovimientoById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener movimientos por insumo
  ipcMain.handle("getInventarioMovimientoByInsumo", async (event, insumoId) => {
    try {
      return (await InventarioMovimiento.findByInsumo(insumoId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getInventarioMovimientoByInsumo]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener movimientos por usuario
  ipcMain.handle("getInventarioMovimientoByUsuario", async (event, usuarioId) => {
    try {
      return (await InventarioMovimiento.findByUsuario(usuarioId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getInventarioMovimientoByUsuario]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo movimiento de inventario
  ipcMain.handle("createInventarioMovimiento", async (event, data) => {
    try {
      return await InventarioMovimiento.create(data);
    } catch (error) {
      console.error("[IPC ERROR createInventarioMovimiento]", error);
      return { error: error.message };
    }
  });

  // Eliminar movimiento de inventario
  ipcMain.handle("deleteInventarioMovimiento", async (event, id) => {
    try {
      await InventarioMovimiento.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteInventarioMovimiento]", error);
      return { error: error.message, deleted: false };
    }
  });
}
