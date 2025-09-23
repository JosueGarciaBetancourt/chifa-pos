// electron/ipc/productosHandlers.js
import { ipcMain } from "electron";
import { Producto } from "../database/models/Producto.js";

export function productosHandlers() {
  ipcMain.handle("getProductos", async () => {
    try {
      return await Producto.selectAll() || [];
    } catch (error) {
      console.error("[IPC ERROR getProductos]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("searchProductosByName", async (event, nombre) => {
    try {
      return await Producto.searchByName(nombre.trim()) || [];
    } catch (error) {
      console.error("[IPC ERROR searchProductosByName]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getProductosActive", async () => {
    try {
      return await Producto.selectActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getProductosActive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getProductosInactive", async () => {
    try {
      return await Producto.selectNoActive() || [];
    } catch (error) {
      console.error("[IPC ERROR getProductosInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle("getProductoById", async (event, id) => {
    try {
      return await Producto.findById(id) || null;
    } catch (error) {
      console.error("[IPC ERROR getProductoById]", error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle("createProducto", async (event, data) => {
    try {
      return await Producto.create(data);
    } catch (error) {
      console.error("[IPC ERROR createProducto]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("updateProducto", async (event, id, data) => {
    try {
      return await Producto.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateProducto]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("disableProducto", async (event, id) => {
    try {
      await Producto.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableProducto]", error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle("enableProducto", async (event, id) => {
    try {
      return await Producto.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableProducto]", error);
      return { error: error.message };
    }
  });

  ipcMain.handle("deleteProducto", async (event, id) => {
    try {
      await Producto.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteProducto]", error);
      return { error: error.message, deleted: false };
    }
  });
}
