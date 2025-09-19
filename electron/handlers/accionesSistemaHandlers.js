import { ipcMain } from 'electron';
import { AccionSistema } from '../database/models/AccionSistema.js';

export function accionesSistemaHandlers() {
  ipcMain.handle('getAccionesSistema', () => {
    try {
      return AccionSistema.selectAll() || [];
    } catch (error) {
      console.error('[IPC ERROR getAccionesSistema]', error);
      return { error: error.message, data: [] };
    }
  });

  ipcMain.handle('getAccionSistemaById', (event, id) => {
    try {
      return AccionSistema.findById(id) || null;
    } catch (error) {
      console.error('[IPC ERROR getAccionSistemaById]', error);
      return { error: error.message, data: null };
    }
  });
}
