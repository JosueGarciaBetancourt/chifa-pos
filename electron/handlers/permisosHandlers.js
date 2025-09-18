import { ipcMain } from 'electron';
import { Permiso } from '../database/models/Permiso.js';

export function permisosHandlers(db) {
  ipcMain.handle('getPermisos', () => {
    try {
      return Permiso.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getPermisos]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getPermisoById', (event, id) => {
    try {
      return Permiso.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getPermisoById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('createPermiso', (event, data) => {
    try {
      const { modulo_id, accion_id } = data;
      if (!modulo_id || !accion_id) {
        throw new Error('modulo_id y accion_id son requeridos');
      }
      return Permiso.create({ modulo_id, accion_id });
    } catch (error) {
      console.error('[IPC ERROR createPermiso]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updatePermiso', (event, id, data) => {
    try {
      return Permiso.update(id, data) || null;
    } catch (error) {
      console.error('[IPC ERROR updatePermiso]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('deletePermiso', (event, id) => {
    try {
      Permiso.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deletePermiso]', error);
      return { error: error.message, deleted: false };
    }
  });
}
