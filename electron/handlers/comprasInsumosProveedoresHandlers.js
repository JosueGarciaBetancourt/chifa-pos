// electron/handlers/comprasInsumosProveedoresHandlers.js
import { ipcMain } from "electron";
import { CompraInsumoProveedor } from "../database/models/CompraInsumoProveedor.js";

export function comprasInsumosProveedoresHandlers() {
  // Obtener todas las compras de insumos-proveedores
  ipcMain.handle("getComprasInsumosProveedores", async () => {
    try {
      return (await CompraInsumoProveedor.selectAll()) || [];
    } catch (error) {
      console.error("[IPC ERROR getComprasInsumosProveedores]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener compra por ID
  ipcMain.handle("getCompraInsumoProveedorById", async (event, id) => {
    try {
      return (await CompraInsumoProveedor.findById(id)) || null;
    } catch (error) {
      console.error("[IPC ERROR getCompraInsumoProveedorById]", error);
      return { error: error.message, data: null };
    }
  });

  // Obtener compras por insumo
  ipcMain.handle("getComprasInsumosProveedoresByInsumo", async (event, insumoId) => {
    try {
      return (await CompraInsumoProveedor.findByInsumo(insumoId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getComprasInsumosProveedoresByInsumo]", error);
      return { error: error.message, data: [] };
    }
  });

  // Obtener compras por proveedor
  ipcMain.handle("getComprasInsumosProveedoresByProveedor", async (event, proveedorId) => {
    try {
      return (await CompraInsumoProveedor.findByProveedor(proveedorId)) || [];
    } catch (error) {
      console.error("[IPC ERROR getComprasInsumosProveedoresByProveedor]", error);
      return { error: error.message, data: [] };
    }
  });

  // Crear nueva compra insumo-proveedor
  ipcMain.handle("createCompraInsumoProveedor", async (event, data) => {
    try {
      return await CompraInsumoProveedor.create(data);
    } catch (error) {
      console.error("[IPC ERROR createCompraInsumoProveedor]", error);
      return { error: error.message };
    }
  });

  // Actualizar compra insumo-proveedor
  ipcMain.handle("updateCompraInsumoProveedor", async (event, id, data) => {
    try {
      return await CompraInsumoProveedor.update(id, data);
    } catch (error) {
      console.error("[IPC ERROR updateCompraInsumoProveedor]", error);
      return { error: error.message };
    }
  });

  // Eliminar compra insumo-proveedor
  ipcMain.handle("deleteCompraInsumoProveedor", async (event, id) => {
    try {
      await CompraInsumoProveedor.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error("[IPC ERROR deleteCompraInsumoProveedor]", error);
      return { error: error.message, deleted: false };
    }
  });
}
