import { ipcMain } from 'electron';
import { Rol } from '../database/models/Rol.js';

export function rolesHandlers() {
  ipcMain.handle('getRoles', () => {
    try {
      return Rol.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getRoles]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getRolById', (event, id) => {
    try {
      return Rol.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getRolById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('getRolesActive', () => {
    try {
      return Rol.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getRolesActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getRolesInactive', () => {
    try {
      return Rol.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getRolesInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('createRol', (event, data) => {
    try {
      return Rol.create(data);
    } catch (error) {
      console.error('[IPC ERROR createRol]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('updateRol', (event, id, data) => {
    try {
      return Rol.update(id, data) || null;
    } catch (error) {
      console.error('[IPC ERROR updateRol]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('disableRol', (event, id) => {
    try {
      Rol.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableRol]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableRol', (event, id) => {
    try {
      return Rol.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableRol]', error);
      return { error: error.message };
    }
  });

  ipcMain.handle('deleteRol', (event, id) => {
    try {
      Rol.delete(id);
      return { deleted: true };
    } catch (error) {
      console.error('[IPC ERROR deleteRol]', error);
      return { error: error.message, deleted: false };
    }
  });
}
