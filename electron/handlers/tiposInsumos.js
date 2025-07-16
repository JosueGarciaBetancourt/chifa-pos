// tiposInsumosHandler.js
import { ipcMain } from 'electron';
import { TipoInsumo } from '../database/models/TiposInsumos.js';

/**
 * Registra los handlers IPC para tipos de insumos.
 * @param {Database} db La conexión a la base de datos.
 */
export function tiposInsumosHandlers(db) {
  // Obtener todos los tipos
  ipcMain.handle('getTiposInsumos', () => {
    try {
      return TipoInsumo.selectAll() || [];
    } catch (error) {
      console.error('Error consultando tipos de insumos:', error);
      return [];
    }
  });

  // Buscar tipo de insumo por nombre (opcional)
  ipcMain.handle('buscarTipoInsumoPorNombre', (event, nombre) => {
    try {
      const stmt = db.prepare(
        'SELECT id, nombre, descripcion FROM tipos_insumos WHERE nombre LIKE ?'
      );
      return stmt.all(`%${nombre}%`);
    } catch (error) {
      console.error('Error buscando tipo de insumo por nombre:', error);
      return [];
    }
  });

  // Puedes agregar más handlers si vas a permitir crear, actualizar o eliminar tipos vía IPC
}
