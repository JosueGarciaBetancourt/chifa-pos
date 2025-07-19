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
  
  ipcMain.handle('buscarProductosPorNombre', (event, search) => {
    try {
      const productos = Producto.searchByName(search.trim()) || [];
      return productos;
    } catch (error) {
      console.error('Error en buscarProductosPorNombre handler:', error);
      return [];
    }
  });
}
