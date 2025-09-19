import { ipcMain } from "electron";
import { Receta } from "../database/models/Receta.js";

export function recetasHandlers() {
  ipcMain.handle("getRecetasByProductoId", async (event, productoId) => {
    try {
      return await Receta.findByProductoId(productoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByProductoId]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getRecetasByInsumoId", async (event, insumoId) => {
    try {
      return await Receta.findByInsumoId(insumoId) || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByInsumoId]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getRecetasByProductosActive", async () => {
    try {
      return await Receta.findByProductosActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByProductosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getRecetasByProductosInactive", async () => {
    try {
      return await Receta.findByProductosInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByProductosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getRecetasByInsumosActive", async () => {
    try {
      return await Receta.findByInsumosActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByInsumosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getRecetasByInsumosInactive", async () => {
    try {
      return await Receta.findByInsumosInactive() || [];
    } catch (error) {
      console.error("[IPC ERROR getRecetasByInsumosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("createReceta", async (event, data) => {
    try {
      return await Receta.create(data);
    } catch (error) {
      console.error("[IPC ERROR createReceta]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateReceta", async (event, productoId, insumoId, cantidad) => {
    try {
      return await Receta.update(productoId, insumoId, cantidad);
    } catch (error) {
      console.error("[IPC ERROR updateReceta]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteReceta", async (event, productoId, insumoId) => {
    try {
      await Receta.delete(productoId, insumoId);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteReceta]", error);
      return { error: error.message, deleted: false };
    }
  });
}
