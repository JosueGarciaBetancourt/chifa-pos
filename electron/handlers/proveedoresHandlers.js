// electron/handlers/proveedoresHandlers.js
import { ipcMain } from "electron";
import { Proveedor } from "../database/models/Proveedor.js";

export function proveedoresHandlers() {
  // Obtener todos los proveedores
  ipcMain.handle("getProveedores", async () => {
    try {
      return (await Proveedor.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getProveedores]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener proveedor por ID
  ipcMain.handle("getProveedorById", async (event, id) => {
    try {
      return (await Proveedor.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getProveedorById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener proveedores activos
  ipcMain.handle("getProveedoresActive", async () => {
    try {
      return (await Proveedor.selectActive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getProveedoresActive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener proveedores inactivos
  ipcMain.handle("getProveedoresInactive", async () => {
    try {
      return (await Proveedor.selectInactive()) || [];
    } catch (error) {
      console.error("[IPC ERROR getProveedoresInactive]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nuevo proveedor
  ipcMain.handle("createProveedor", async (event, data) => {
    try {
      return await Proveedor.create(data);
    } catch (error) {
      console.error("[IPC ERROR createProveedor]", error);
      return { error: error.message };
    }
  });

  // Actualizar proveedor
  ipcMain.handle("updateProveedor", async (event, id, data) => {
    try {
      return await Proveedor.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateProveedor]", error);
      return { error: error.message };
    }
  });

  // Deshabilitar proveedor
  ipcMain.handle("disableProveedor", async (event, id) => {
    try {
      await Proveedor.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error("[IPC ERROR disableProveedor]", error);
      return { error: error.message, disabled: false };
    }
  });

  // Habilitar proveedor
  ipcMain.handle("enableProveedor", async (event, id) => {
    try {
      return await Proveedor.enable(id);
    } catch (error) {
      console.error("[IPC ERROR enableProveedor]", error);
      return { error: error.message };
    }
  });

  // Eliminar proveedor
  ipcMain.handle("deleteProveedor", async (event, id) => {
    try {
      await Proveedor.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteProveedor]", error);
      return { error: error.message, deleted: false };
    }
  });
}
