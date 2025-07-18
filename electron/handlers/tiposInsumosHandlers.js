// tiposInsumosHandler.js
import { ipcMain } from 'electron';
import { TipoInsumo } from '../database/models/TipoInsumo.js';

export function tiposInsumosHandlers(db) {
  ipcMain.handle('getTiposInsumos', () => {
    try {
      return TipoInsumo.selectAll() || [];
    } catch (error) {
      console.error('Error consultando tipos de insumos:', error);
      return [];
    }
  });
}
