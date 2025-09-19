// electron/ipc/categoriasProductosHandlers.js
import { ipcMain } from 'electron';
import { CategoriaProducto } from '../database/models/CategoriaProducto.js';

export function categoriasProductosHandlers() {
  ipcMain.handle('getCategoriasProductos', async () => {
    try {
      return await CategoriaProducto.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getCategoriasProductos]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getCategoriaProductoById', async (event, id) => {
    try {
      return await CategoriaProducto.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getCategoriaProductoById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('getCategoriasProductosActive', async () => {
    try {
      return await CategoriaProducto.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getCategoriasProductosActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getCategoriasProductosInactive', async () => {
    try {
      return await CategoriaProducto.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getCategoriasProductosInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('createCategoriaProducto', async (event, data) => {
    try {
      return await CategoriaProducto.create(data);
    } catch (error) {
      console.error('[IPC ERROR createCategoriaProducto]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updateCategoriaProducto', async (event, id, data) => {
    try {
      return await CategoriaProducto.update(id, data);
    } catch (error) {
      console.error('[IPC ERROR updateCategoriaProducto]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('disableCategoriaProducto', async (event, id) => {
    try {
      await CategoriaProducto.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableCategoriaProducto]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableCategoriaProducto', async (event, id) => {
    try {
      return await CategoriaProducto.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableCategoriaProducto]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('deleteCategoriaProducto', async (event, id) => {
    try {
      await CategoriaProducto.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deleteCategoriaProducto]', error);
      return { error: error.message, deleted: false };
    }
  });
}
