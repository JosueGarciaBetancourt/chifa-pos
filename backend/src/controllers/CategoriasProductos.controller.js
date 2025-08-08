import { CategoriaProducto } from '../../../electron/database/models/CategoriaProducto.js';

export const categoriasProductosController = {
  getCategoriasProductos: async (req, res) => {
    try {
      const categoriasProductos = await CategoriaProducto.selectAll();
      res.json(categoriasProductos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategoriaProductoById: async (req, res) => {
    try {
      const categoriaProducto = await CategoriaProducto.findById(req.params.id);
      if (!categoriaProducto) {
        return res.status(404).json({ error: 'Categoría no encontrada' });
      }
      res.json(categoriaProducto);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategoriasProductosActive: async (req, res) => {
    try {
      const categoriasProductos = await CategoriaProducto.selectActive();
      res.json(categoriasProductos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getCategoriasProductosInactive: async (req, res) => {
    try {
      const categoriasProductos = await CategoriaProducto.selectInactive();
      res.json(categoriasProductos || []);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createCategoriaProducto: async (req, res) => {
    try {
      const nuevaCategoria = await CategoriaProducto.create(req.body);
      res.status(201).json(nuevaCategoria);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateCategoriaProducto: async (req, res) => {
    try {
      const categoriaActualizada = await CategoriaProducto.update(
        req.params.id, 
        req.body
      );
      res.json(categoriaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  
  disableCategoriaProducto: async (req, res) => {
    try {
      await CategoriaProducto.disable(req.params.id);
      res.status(200).json({ disabled: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  enableCategoriaProducto: async (req, res) => {
    try {
      const categoriaProductoEnabled = await CategoriaProducto.enable(req.params.id);
      res.status(200).json(categoriaProductoEnabled);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteCategoriaProducto: async (req, res) => {
    try {
      await CategoriaProducto.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};