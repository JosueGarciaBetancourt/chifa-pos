import { TipoInsumo } from '../../../electron/database/models/tipoInsumo.js';

export const tipoInsumoController = {
  getAll: async (req, res) => {
    try {
      const tipos = await TipoInsumo.selectAll();
      res.json(tipos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const tipo = await TipoInsumo.findById(req.params.id);
      if (!tipo) return res.status(404).json({ error: 'Tipo no encontrado' });
      res.json(tipo);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevoTipo = await TipoInsumo.create(req.body);
      res.status(201).json(nuevoTipo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const tipoActualizado = await TipoInsumo.update(
        req.params.id, 
        req.body
      );
      res.json(tipoActualizado);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await TipoInsumo.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};