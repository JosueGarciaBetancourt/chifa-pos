import { ipcMain } from 'electron';
import { ModuloSistema } from '../database/models/ModuloSistema.js';

export function modulosSistemaHandlers() {
  ipcMain.handle('getModulosSistema', () => {
    try {
      return ModuloSistema.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getModulosSistema]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getModuloSistemaById', (event, id) => {
    try {
      return ModuloSistema.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getModuloSistemaById]', error);
      return { error: error.message, data: null };
    }
  });

  ipcMain.handle('getModulosSistemaActive', () => {
    try {
      return ModuloSistema.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getModulosSistemaActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getModulosSistemaInactive', () => {
    try {
      return ModuloSistema.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getModulosSistemaInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('disableModuloSistema', (event, id) => {
    try {
      ModuloSistema.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableModuloSistema]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableModuloSistema', (event, id) => {
    try {
      return ModuloSistema.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableModuloSistema]', error);
      return { error: error.message };
    }
  });
}
