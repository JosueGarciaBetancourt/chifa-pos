import { ipcMain } from 'electron';
import { SedeLocal } from '../database/models/SedeLocal.js';

export function sedeLocalHandlers() {
  ipcMain.handle('getSedeLocalAll', () => {
    try {
      return SedeLocal.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getSedeLocalAll]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getSedeLocalActive', () => {
    try {
      return SedeLocal.selectActive() || [];
    } catch (error) {
      console.error('[IPC ERROR getSedeLocalActive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getSedeLocalInactive', () => {
    try {
      return SedeLocal.selectInactive() || [];
    } catch (error) {
      console.error('[IPC ERROR getSedeLocalInactive]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('updateSedeLocal', (event, id, data) => {
    try {
      return SedeLocal.update(id, data) || [];
    } catch (error) {
      console.error('[IPC ERROR updateSedeLocal]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('disableSedeLocal', (event, id) => {
    try {
      SedeLocal.disable(id);
      return { disabled: true };
    } catch (error) {
      console.error('[IPC ERROR disableSedeLocal]', error);
      return { error: error.message, disabled: false };
    }
  });

  ipcMain.handle('enableSedeLocal', (event, id) => {
    try {
      return SedeLocal.enable(id);
    } catch (error) {
      console.error('[IPC ERROR enableSedeLocal]', error);
      return { error: error.message };
    }
  });
}
