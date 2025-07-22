// backend/src/controllers/productos.controller.js
import { Producto } from '../../../electron/database/models/Producto.js';

export const productosController = {
  getProductos(req, res) {
    try {
      const productos = Producto.selectAll() || [];
      res.json(productos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },

  buscarProductosPorNombre(req, res) {
    try {
      const { search } = req.query;
      const productos = Producto.searchByName(search.trim()) || [];
      res.json(productos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },

  getProductosActivos(req, res) {
    try {
      const productos = Producto.selectActive() || [];
      res.json(productos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },

  getProductosNoActivos(req, res) {
    try {
      const productos = Producto.selectNoActive() || [];
      res.json(productos);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },

  getProductoById(req, res) {
    try {
      const { id } = req.params;
      const producto = Producto.findById(id) || [];
      res.json(producto);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },
  
  createProducto(req, res) {
    try {
      const nuevoProducto = Producto.create(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },
  
  updateProducto(req, res) {
    try {
      const { id } = req.params;
      const productoActualizado = Producto.update(id, req.body);
      res.json(productoActualizado);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },
  
  deleteProducto(req, res) {
    try {
      const { id } = req.params;
      Producto.delete(id);
      res.json({ deleted: true });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: 'Server Error: ' + error.message });
    }
  },
};
