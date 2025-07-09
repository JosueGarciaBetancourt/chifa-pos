// backend/src/controllers/productos.controller.js
import { Producto } from '../../../electron/database/models/Productos.js';

export const productosController = {
  getProductos(req, res) {
    try {
      const productos = Producto.selectAll() || [];
      res.json(productos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  }
};
