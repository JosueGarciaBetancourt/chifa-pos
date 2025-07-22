import { Mesa } from '../../../electron/database/models/mesa.js';

export const mesaController = {
  getAll: async (req, res) => {
    try {
      const mesas = await Mesa.selectAll();
      res.json(mesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getById: async (req, res) => {
    try {
      const mesa = await Mesa.findById(req.params.id);
      if (!mesa) return res.status(404).json({ error: 'Mesa no encontrada' });
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBySede: async (req, res) => {
    try {
      const mesas = await Mesa.findBySede(req.params.sedeId);
      res.json(mesas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getByNumero: async (req, res) => {
    try {
      const mesa = await Mesa.findByNumero(req.params.numero);
      if (!mesa) return res.status(404).json({ error: 'Mesa no encontrada' });
      res.json(mesa);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  create: async (req, res) => {
    try {
      const nuevaMesa = await Mesa.create(req.body);
      res.status(201).json(nuevaMesa);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const mesaActualizada = await Mesa.update(req.params.id, req.body);
      res.json(mesaActualizada);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      await Mesa.delete(req.params.id);
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};