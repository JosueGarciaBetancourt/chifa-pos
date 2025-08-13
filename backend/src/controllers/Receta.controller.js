import { Receta } from '../../../electron/database/models/receta.js';

export const recetaController = {
  getRecetasByProductoId: async (req, res) => {
    try {
      const recetas = await Receta.findByProductoId(req.params.productoId);
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRecetasByInsumoId: async (req, res) => {
    try {
      const recetas = await Receta.findByInsumoId(req.params.insumoId);
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRecetasByProductosActive: async (req, res) => {
    try {
      const recetas = await Receta.findByProductosActive();
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRecetasByProductosInactive: async (req, res) => {
    try {
      const recetas = await Receta.findByProductosInactive();
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRecetasByInsumosActive: async (req, res) => {
    try {
      const recetas = await Receta.findByInsumosActive();
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getRecetasByInsumosInactive: async (req, res) => {
    try {
      const recetas = await Receta.findByInsumosInactive();
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createReceta: async (req, res) => {
    try {
      const nuevasRecetas = await Receta.create(req.body);
      res.status(201).json(nuevasRecetas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  updateReceta: async (req, res) => {
    try {
      const recetasActualizadas = await Receta.update(
        req.params.productoId, 
        req.params.insumoId, 
        req.body.cantidad
      );
      res.json(recetasActualizadas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteReceta: async (req, res) => {
    try {
      const resultado = await Receta.delete(
        req.params.productoId, 
        req.params.insumoId
      );
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};