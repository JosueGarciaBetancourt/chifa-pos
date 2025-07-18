// insumosHandler.js
import { ipcMain } from 'electron';
import { Insumo } from '../database/models/Insumo.js';

export function insumosHandlers(db) {
  ipcMain.handle('getInsumos', () => {
    try {
      return Insumo.selectAll() || [];
    } catch (error) {
      console.error('Error consultando todos los insumos:', error);
      return [];
    }
  });
}
