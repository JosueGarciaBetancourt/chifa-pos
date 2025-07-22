import { Receta } from '../../../electron/database/models/receta.js';

export const recetaController = {
  getByProducto: async (req, res) => {
    try {
      const recetas = await Receta.findByProductoId(req.params.productoId);
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByInsumo: async (req, res) => {
    try {
      const recetas = await Receta.findByInsumoId(req.params.insumoId);
      res.json(recetas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevasRecetas = await Receta.create(req.body);
      res.status(201).json(nuevasRecetas);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
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

  delete: async (req, res) => {
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