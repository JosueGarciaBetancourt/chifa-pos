// insumosHandler.js
import { ipcMain } from 'electron';
import { Insumo } from '../database/models/Insumo.js';

/**
 * Registra los handlers IPC para insumos.
 * @param {Database} db La conexión a la base de datos.
 */
export function insumosHandlers(db) {
  ipcMain.handle('getInsumos', () => {
    try {
      return Insumo.selectAll() || [];
    } catch (error) {
      console.error('Error consultando todos los insumos:', error);
      return [];
    }
  });

  ipcMain.handle('buscarInsumosPorNombre', (event, nombre) => {
    try {
      const stmt = db.prepare(
        'SELECT id, nombre, unidad_medida, stock_actual, stock_minimo, costo FROM insumos WHERE nombre LIKE ?'
      );
      return stmt.all(`%${nombre}%`);
    } catch (error) {
      console.error('Error buscando insumos por nombre:', error);
      return [];
    }
  });

  ipcMain.handle('getInsumosBajoStock', () => {
    try {
      const stmt = db.prepare(
        'SELECT id, nombre, unidad_medida, stock_actual, stock_minimo, costo FROM insumos WHERE stock_actual < stock_minimo'
      );
      return stmt.all();
    } catch (error) {
      console.error('Error consultando insumos con stock bajo:', error);
      return [];
    }
  });

  // Puedes agregar más handlers aquí: agregar, actualizar, eliminar si los manejas por IPC.
}
