import { CategoriasProductos } from '../../../electron/database/models/CategoriaProducto.js';

export const categoriasProductosController = {
  getAll: async (req, res) => {
    try {
      const categorias = await CategoriasProductos.selectAll();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const categoria = await CategoriasProductos.findById(req.params.id);
      if (!categoria) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      res.json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaCategoria = await CategoriasProductos.create(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const categoriaActualizada = await CategoriasProductos.update(
        req.params.id, 
        req.body
      );
      res.json(categoriaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await CategoriasProductos.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};