// electron/handlers/insumosProveedoresHandlers.js
import { ipcMain } from "electron";
import { InsumoProveedor } from "../database/models/InsumoProveedor.js";

export function insumosProveedoresHandlers() {
  // Obtener todas las relaciones insumo-proveedor
  ipcMain.handle("getInsumosProveedores", async () => {
    try {
      return (await InsumoProveedor.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getInsumosProveedores]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener relación por ID
  ipcMain.handle("getInsumoProveedorById", async (event, id) => {
    try {
      return (await InsumoProveedor.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getInsumoProveedorById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener relaciones por insumo
  ipcMain.handle("getByInsumo", async (event, insumoId) => {
    try {
      return (await InsumoProveedor.findByInsumo(insumoId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getByInsumo]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener relaciones por proveedor
  ipcMain.handle("getByProveedor", async (event, proveedorId) => {
    try {
      return (await InsumoProveedor.findByProveedor(proveedorId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getByProveedor]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nueva relación insumo-proveedor
  ipcMain.handle("createInsumoProveedor", async (event, data) => {
    try {
      return await InsumoProveedor.create(data);
    } catch (error) {
      console.error("[IPC ERROR createInsumoProveedor]", error);
      return { error: error.message };
    }
  });

  // Actualizar relación insumo-proveedor
  ipcMain.handle("updateInsumoProveedor", async (event, id, data) => {
    try {
      return await InsumoProveedor.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateInsumoProveedor]", error);
      return { error: error.message };
    }
  });

  // Eliminar relación insumo-proveedor
  ipcMain.handle("deleteInsumoProveedor", async (event, id) => {
    try {
      await InsumoProveedor.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteInsumoProveedor]", error);
      return { error: error.message, deleted: false };
    }
  });
}
