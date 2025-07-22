import { Producto } from '../../../electron/database/models/producto.js';

export const productoController = {
  getAll: async (req, res) => {
    try {
      const productos = await Producto.selectAll();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchByName: async (req, res) => {
    try {
      const productos = await Producto.searchByName(req.query.nombre);
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getActive: async (req, res) => {
    try {
      const productos = await Producto.selectActive();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getNoActive: async (req, res) => {
    try {
      const productos = await Producto.selectNoActive();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const producto = await Producto.findById(req.params.id);
      if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
      res.json(producto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoProducto = await Producto.create(req.body);
      res.status(201).json(nuevoProducto);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const productoActualizado = await Producto.update(
        req.params.id, 
        req.body
      );
      res.json(productoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Producto.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};