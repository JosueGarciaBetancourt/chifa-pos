import { ipcMain } from 'electron';

/**
 * Registra los handlers IPC para productos.
 * @param {Database} db La conexión a la base de datos.
 */
export function productosHandlers(db) {
  ipcMain.handle('getProductosByCategoria', (event, categoria) => {
    try {
      const stmt = db.prepare(
        'SELECT id, nombre, descripcion, precio FROM productos WHERE categoria = ?'
      );
      const productos = stmt.all(categoria);
      return productos;
    } catch (error) {
      console.error('Error consultando productos por categoría:', error);
      return [];
    }
  });

  ipcMain.handle('buscarProductosPorNombre', (event, nombre) => {
    try {
      const stmt = db.prepare(
        'SELECT id, nombre, descripcion, precio FROM productos WHERE nombre LIKE ?'
      );
      const productos = stmt.all(`%${nombre}%`);
      return productos;
    } catch (error) {
      console.error('Error buscando productos por nombre:', error);
      return [];
    }
  });


}
