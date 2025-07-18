import { ipcMain } from 'electron';
import { Producto } from '../database/models/Producto.js';

export function productosHandlers(db) {
  ipcMain.handle('getProductos', (event) => {
    try {
      const productos = Producto.selectAll();
      return productos;
    } catch (error) {
      console.error('Error consultando todos los productos:', error);
      return [];
    }
  });
}
